import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, getProfile } from '../../redux/userSlice';
import paymentService from '../../services/paymentService';
import toast from 'react-hot-toast';

const Pricing = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (plan) => {
    if (!user) {
      toast.error("Please login to purchase a plan");
      navigate('/login');
      return;
    }

    if (plan.price === "₹0") {
      navigate('/dashboard');
      return;
    }

    try {
      setLoading(true);
      toast.loading("Creating order...", { id: "payment" });
      
      // Create order
      const orderData = await paymentService.createOrder(plan.name.toLowerCase());
      
      toast.loading("Opening payment gateway...", { id: "payment" });
      
      // Initiate payment
      await paymentService.initiatePayment(orderData, user);
      
      // Refresh user profile to update subscription status
      await dispatch(getProfile());
      
      toast.success(`Payment successful! Welcome to ${plan.name}!`, { id: "payment" });
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.", { id: "payment" });
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Perfect for getting started",
      features: [
        "1 Resume Template",
        "Basic AI Analysis",
        "PDF Export",
        "7-day Access"
      ],
      icon: Star,
      color: "text-gray-400",
      buttonColor: "bg-white/10 hover:bg-white/20",
      popular: false
    },
    {
      name: "Premium",
      price: "₹499",
      description: "Best for job seekers",
      features: [
        "Unlimited Resume Templates",
        "Advanced AI Analysis",
        "Cover Letter Generator",
        "Unlimited PDF Exports",
        "Priority Email Support"
      ],
      icon: Zap,
      color: "text-blue-400",
      buttonColor: "bg-blue-600 hover:bg-blue-500",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2532&auto=format&fit=crop")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4
        }}
      />
      
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              Choose Your Plan
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Unlock your full potential with our professional resume building tools and AI-powered insights.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`relative rounded-2xl p-8 backdrop-blur-xl border ${
                  plan.popular 
                    ? 'bg-blue-900/20 border-blue-500/50 shadow-2xl shadow-blue-500/10' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                } transition-all duration-300 hover:-translate-y-2`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg bg-white/5 ${plan.color}`}>
                    <plan.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "₹0" && <span className="text-gray-400">/one-time</span>}
                </div>

                <p className="text-gray-400 mb-8 h-12">{plan.description}</p>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <Check size={18} className="text-green-400 mt-1 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handlePayment(plan)}
                  disabled={loading || (plan.name === "Premium" && user?.subscriptionPlan === "premium")}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.name === "Premium" && user?.subscriptionPlan === "premium"
                      ? "bg-green-600 cursor-default"
                      : `${plan.buttonColor} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`
                  }`}
                >
                  {plan.name === "Premium" && user?.subscriptionPlan === "premium" 
                    ? "Current Plan" 
                    : plan.price === "₹0" ? "Get Started" : "Buy Now"}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
              <Shield size={16} />
              <span>Secure payment via Razorpay</span>
              <span className="mx-2">•</span>
              <Clock size={16} />
              <span>30-day money-back guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
