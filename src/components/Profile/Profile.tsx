import React, { useState } from "react";
import styles from "./Profile.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useDisclosure } from "@nextui-org/modal";
import Delete from "../Delete/Delete";
import StripeCheckout from "../StripeCheckout/StripeCheckout";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { resetAISettings } from "@/store/aiSlice";
import { resetChat } from "@/store/chatSlice";
import { resetAuth, selectUserDetailsState } from "@/store/authSlice";

import User from "../../../public/svgs/sidebar/User.svg";

type Props = {
  close: () => void;
};

const Plugins = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetailsState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPro, setIsPro] = useState(false); // You can connect this to your user subscription state

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      await auth.signOut();
      props.close();
      dispatch(resetAISettings());
      dispatch(resetChat());
      dispatch(resetAuth());
      router.push("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onOpen();
  };
  return (
    <div className={styles.list}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Profile</div>
      </div>
      <ScrollShadow
        isEnabled={false}
        hideScrollBar
        className="h-[calc(100vh_-_56px)] w-full"
      >
        <div className={styles.listContainer}>
          <div className={styles.profile}>
            <Image
              src={userDetails.profilePic ? userDetails.profilePic : User}
              width={150}
              height={150}
              alt="Profile Empty"
              className={styles.profileImage}
            />
            <div className={styles.profileTextContainer}>
              <div className={styles.profileHeader}>Name</div>
              <div className={styles.profileText}>{userDetails.name}</div>
              <div className={styles.profileHeader}>Email</div>
              <div className={styles.profileText}>{userDetails.email}</div>
              <div className={styles.profileHeader}>Plan</div>
              <div className={styles.profileText}>
                {isPro ? "Pro Plan" : "Free Plan"}
              </div>
            </div>
          </div>
          
          {/* Professional Stripe Pro Plan Section */}
          {!isPro && (
            <div className={styles.proSection}>
              <div className={styles.proHeader}>
                <div className={styles.proTitle}>🚀 Upgrade to Pro</div>
                <div className={styles.proSubtitle}>Unlock unlimited features</div>
              </div>
              <div className={styles.proFeatures}>
                <div className={styles.proFeature}>✓ Unlimited chat conversations</div>
                <div className={styles.proFeature}>✓ Advanced AI models access</div>
                <div className={styles.proFeature}>✓ Priority support</div>
                <div className={styles.proFeature}>✓ Export chat history</div>
                <div className={styles.proFeature}>✓ Custom plugins</div>
              </div>
              <div className={styles.proPricing}>
                <span className={styles.proPrice}>$10</span>
                <span className={styles.proPeriod}>one-time</span>
              </div>
              <div className={styles.stripeContainer}>
                <StripeCheckout />
              </div>
            </div>
          )}
          
          <div className={styles.bottomContainer}>
            <div onClick={handleLogout} className={styles.button}>
              Log Out
            </div>
            <div onClick={handleDelete} className={styles.deleteButton}>
              Delete Account
            </div>
          </div>
        </div>
      </ScrollShadow>
      <Delete isOpen={isOpen} onClose={onClose} delete={handleLogout} />
    </div>
  );
};

export default Plugins;
