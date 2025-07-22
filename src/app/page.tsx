import styles from "@/styles/Home.module.css";
import AuthWrapper from "./AuthWrapper";
import MainPrompt from "../components/MainPrompt/MainPrompt";
import StripeCheckout from "../components/StripeCheckout/StripeCheckout";

const Home = () => {
  return (
    <AuthWrapper>
      {/* Main Content */}
      <div className={styles.main}>
        <MainPrompt />
      </div>
      
      {/* Assignment Demo Section - Below the fold */}
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            💼 Professional Stripe Integration
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Production-Ready Payment System & Cloud Deployment
          </p>
          
          {/* Stripe Checkout Component */}
          <StripeCheckout />
          
          <div className="mt-8 text-sm text-white">
            <p>✅ Enterprise-grade payment integration</p>
            <p>✅ Secure Stripe checkout implementation</p>
            <p>✅ Production-ready Azure deployment</p>
            <p>✅ Professional UI/UX design</p>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Home;
