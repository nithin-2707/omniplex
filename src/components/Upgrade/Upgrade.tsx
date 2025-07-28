import React, { useState } from "react";
import styles from "./Upgrade.module.css";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import StripeCheckout from "../StripeCheckout/StripeCheckout";

type Props = {
  close: () => void;
};

const Upgrade = (props: Props) => {
  const [isPro, setIsPro] = useState(false); // You can connect this to your user subscription state

  return (
    <div className={styles.list}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>🚀 Upgrade to Pro</div>
      </div>
      <ScrollShadow
        isEnabled={false}
        hideScrollBar
        className="h-[calc(100vh_-_56px)] w-full"
      >
        <div className={styles.listContainer}>
          {!isPro ? (
            <div className={styles.upgradeContainer}>
              {/* Hero Section */}
              <div className={styles.heroSection}>
                <div className={styles.heroIcon}>⭐</div>
                <h2 className={styles.heroTitle}>Omniplex Pro</h2>
                <p className={styles.heroSubtitle}>
                  Unlock the full potential of AI conversations
                </p>
              </div>

              {/* Features Grid */}
              <div className={styles.featuresGrid}>
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>💬</div>
                  <div className={styles.featureText}>
                    <div className={styles.featureTitle}>Unlimited Chats</div>
                    <div className={styles.featureDesc}>No conversation limits</div>
                  </div>
                </div>
                
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>🔍</div>
                  <div className={styles.featureText}>
                    <div className={styles.featureTitle}>Advanced Search</div>
                    <div className={styles.featureDesc}>Enhanced AI capabilities</div>
                  </div>
                </div>
                
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>⚡</div>
                  <div className={styles.featureText}>
                    <div className={styles.featureTitle}>Priority Support</div>
                    <div className={styles.featureDesc}>Get help when you need it</div>
                  </div>
                </div>
                
                <div className={styles.feature}>
                  <div className={styles.featureIcon}>📁</div>
                  <div className={styles.featureText}>
                    <div className={styles.featureTitle}>Export History</div>
                    <div className={styles.featureDesc}>Save your conversations</div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className={styles.pricingSection}>
                <div className={styles.price}>
                  <span className={styles.priceAmount}>$10</span>
                  <span className={styles.pricePeriod}>one-time</span>
                </div>
                <div className={styles.priceNote}>
                  Special launch offer - lifetime access!
                </div>
              </div>

              {/* Stripe Checkout */}
              <div className={styles.checkoutSection}>
                <StripeCheckout />
              </div>

              {/* Trust Indicators */}
              <div className={styles.trustSection}>
                <div className={styles.trustItem}>🔒 Secure payment by Stripe</div>
                <div className={styles.trustItem}>✅ Instant activation</div>
                <div className={styles.trustItem}>💯 30-day money back guarantee</div>
              </div>
            </div>
          ) : (
            <div className={styles.proUserSection}>
              <div className={styles.successIcon}>🎉</div>
              <h2 className={styles.successTitle}>You&apos;re Pro!</h2>
              <p className={styles.successMessage}>
                Enjoy unlimited access to all Omniplex features.
              </p>
            </div>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default Upgrade;
