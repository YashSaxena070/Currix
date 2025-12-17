package com.yash.AI_Resume.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import com.yash.AI_Resume.document.Payment;
import com.yash.AI_Resume.document.User;
import com.yash.AI_Resume.dto.AuthResponse;
import com.yash.AI_Resume.repository.PaymentRepository;
import com.yash.AI_Resume.repository.UserRespository;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.yash.AI_Resume.utils.AppConstants.PREMIUM;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final AuthService authService;
    private final UserRespository userRespository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    public Payment createOrder(Object principal, String planType) throws RazorpayException {
        //Initial Step
        AuthResponse authResponse = authService.getProfile(principal);

        //Step 1: Initialize the razorpay client
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        //Step 2: Pepare the JSON object to pass the razorpay
        int amount = 99900; //Amount in paise
        String currency = "INR";
        String receipt = PREMIUM+"_"+ UUID.randomUUID().toString().substring(0,8);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", receipt);


        //Step 3: Call the razorpay API to create order
        Order razorpayOrder = razorpayClient.orders.create(orderRequest);


        //Step 4: Save the order details into database
        Payment newPayment = Payment.builder()
                .userId(authResponse.getId())
                .razorpayOrderId(razorpayOrder.get("id"))
                .amount(amount)
                .currency(currency)
                .planType(planType)
                .receipt(receipt)
                .status("created")
                .build();


        //Step 5: return the result
        return paymentRepository.save(newPayment);

    }

    public boolean verifyPayment(String razorpayOrderId, String razorpayPaymentId , String razorpaySignature) throws RazorpayException {
        try{
            JSONObject attributes = new JSONObject();
            attributes.put("razorpayOrderId", razorpayOrderId);
            attributes.put("razorpayPaymentId", razorpayPaymentId);
            attributes.put("razorpaySignature", razorpaySignature);

            boolean isValidSignature = Utils.verifyPaymentSignature(attributes, razorpayKeySecret);

            if(isValidSignature){
                //update the payment status
                Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId)
                        .orElseThrow(() -> new RuntimeException("Payment not found"));

                payment.setRazorpayPaymentId(razorpayPaymentId);
                payment.setRazorpaySignature(razorpaySignature);
                payment.setStatus("paid");
                paymentRepository.save(payment);

                //upgrade the user subscription
                upgradeUserSubscription(payment.getUserId(), payment.getPlanType());
                return true;
            }
            return false;
        } catch(Exception e){
            log.error("Error in verifying the payment", e);
            return false;
        }
    }

    private void upgradeUserSubscription(String userId, String planType) {
        User existingUser = userRespository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        existingUser.setSubscriptionPlan(planType);
        userRespository.save(existingUser);
        log.info("User {} upgraded to {} plan", userId, planType);
    }


    public List<Payment> getUserPayments(Object principal) {
        //1. get the current profile
        AuthResponse authResponse = authService.getProfile(principal);

        //2. Call teh repo finder method
        return paymentRepository.findByUserIdOrderByCreatedAtDesc(authResponse.getId());
    }

    public Payment getPaymentDetails(String orderId) {
        return paymentRepository.findByRazorpayOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
