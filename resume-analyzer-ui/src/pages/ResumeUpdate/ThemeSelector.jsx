import React, { useEffect, useRef, useState } from "react";
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalette,
} from "../../utils/data";
import { CircleCheckBig } from "lucide-react";
import Tabs from "../../components/Extra/Tabs";
import TemplateCard from "../../components/Cards/TemplateCard";
import RenderResume from "../../components/ResumeTemplates/RenderResume";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import paymentService from "../../services/paymentService";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palettes" }];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const user = useSelector(selectUser);
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [templateRestrictions, setTemplateRestrictions] = useState({
    availableTemplates: [],
    allTemplates: [],
    subscriptionPlan: 'basic',
    isPremium: false
  });

  const [tabValue, setTabValue] = useState("Templates");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  // Fetch template restrictions
  useEffect(() => {
    const fetchTemplateRestrictions = async () => {
      try {
        // Mocking response for now if endpoint doesn't exist yet or fails
        // const response = await axiosInstance.get(API_PATHS.AUTH.TEMPLATES);
        // setTemplateRestrictions(response.data);
        
        // Fallback/Mock logic
        setTemplateRestrictions({
            availableTemplates: ['01'],
            allTemplates: ['01', '02', '03'],
            subscriptionPlan: user?.subscriptionPlan || 'basic',
            isPremium: user?.subscriptionPlan === 'premium'
        });

      } catch (error) {
        console.error("Error fetching template restrictions:", error);
        // toast.error("Failed to load template restrictions");
      }
    };

    if (user) {
      fetchTemplateRestrictions();
    }
  }, [user]);

  // Handle Theme Change
  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });
    onClose();
  };

  // Handle locked template click
  const handleLockedTemplateClick = () => {
    toast("Upgrade to Premium to access all templates!", {
      icon: "🔒",
      style: {
        borderRadius: "10px",
        background: "#f97316",
        color: "#fff",
      },
    });
  };

  // Check if template is locked
  const isTemplateLocked = (templateId) => {
    // Template '01' is always available for basic users
    if (templateId === '01') {
      return false;
    }
    // Templates '02' and '03' are locked for basic users
    return !templateRestrictions.isPremium;
  };

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  // Handle upgrade to premium
  const handleUpgradeToPremium = async () => {
    try {
      toast.loading("Creating order...", { id: "payment" });
      
      // Create order
      const orderData = await paymentService.createOrder("premium");
      
      toast.loading("Opening payment gateway...", { id: "payment" });
      
      // Initiate payment
      const paymentResult = await paymentService.initiatePayment(orderData, user);
      
      toast.success("Payment successful! Welcome to Premium!", { id: "payment" });
      
      // Refresh user profile logic here if needed
      
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.", { id: "payment" });
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-0 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5 mt-2 px-4">
        <div className="flex items-center gap-3">
          <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
          {!templateRestrictions.isPremium && (
            <div className="flex items-center gap-2 hidden md:flex">
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                Basic Plan
              </div>
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-200"
                onClick={handleUpgradeToPremium}
              >
                Upgrade to Premium ₹999
              </button>
            </div>
          )}
          {templateRestrictions.isPremium && (
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              Premium Plan
            </div>
          )}
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          onClick={() => handleThemeSelection()}
        >
          <CircleCheckBig className="text-[16px]" />
          Done
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5 flex-1 overflow-hidden px-4 pb-4">
        <div className="col-span-12 md:col-span-5 bg-white h-full overflow-hidden flex flex-col">
          <div className="grid grid-cols-2 gap-5 overflow-y-auto custom-scrollbar p-2">
            {tabValue === "Templates" &&
              resumeTemplates.map((template, index) => {
                const isLocked = isTemplateLocked(template.id);
                return (
                  <TemplateCard
                    key={`templates_${index}`}
                    thumbnailImg={template.thumbnailImg}
                    isSelected={selectedTemplate?.theme === template.id}
                    isLocked={isLocked}
                    onSelect={() =>
                      setSelectedTemplate({ theme: template.id, index })
                    }
                    onLockedClick={handleLockedTemplateClick}
                  >
                    <div className="w-full h-full overflow-hidden relative bg-white">
                        <div className="scale-[0.25] origin-top-left absolute top-0 left-0 w-[400%] h-[400%] pointer-events-none">
                            <RenderResume 
                                templateId={template.id}
                                resumeData={resumeData || DUMMY_RESUME_DATA}
                                colorPalette={selectedColorPalette?.colors || []}
                                containerWidth={800}
                            />
                        </div>
                    </div>
                  </TemplateCard>
                );
              })}

            {tabValue === "Color Palettes" &&
              themeColorPalette.themeOne.map((colors, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={colors}
                  isSelected={selectedColorPalette?.colors === colors}
                  onSelect={() => setSelectedColorPalette({ colors, index })}
                />
              ))}
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center p-4" ref={resumeRef}>
          <div className="scale-[0.6] origin-top">
            <RenderResume
                templateId={selectedTemplate?.theme || "01"}
                resumeData={resumeData || DUMMY_RESUME_DATA}
                containerWidth={baseWidth}
                colorPalette={selectedColorPalette?.colors || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

const ColorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 cursor-pointer ${
        isSelected ? "border-purple-500" : "border-transparent hover:border-purple-200"
      }`}
      onClick={onSelect}
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          className="flex-1"
          style={{ backgroundColor: colors[index] }}
        />
      ))}
    </div>
  );
};