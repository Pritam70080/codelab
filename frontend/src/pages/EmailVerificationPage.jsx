import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { MailCheck, MailWarning, LoaderCircle } from "lucide-react";

import { pageTransition } from "../lib/pageTransition";
import { useAuthStore } from "../store/useAuthStore";

const EmailVerificationPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const { verifyEmail, isVerifyingEmail } = useAuthStore();

    const [verificationStatus, setVerificationStatus] = useState("verifying");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verify = async () => {
            if (!token) {
                setVerificationStatus("error");
                setMessage("Verification token is missing.");
                return;
            }

            const result = await verifyEmail(token);

            if (result.success) {
                setVerificationStatus("success");
                setMessage(result.message);

                // Give the user a moment to see the success state
                setTimeout(() => {
                    navigate("/login", {
                        replace: true
                    });
                }, 3000);
            } else {
                setVerificationStatus("error");
                setMessage(result.message);
            }
        };

        verify();
    }, [token, verifyEmail, navigate]);

    return (
        <motion.div
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen flex items-center justify-center px-4"
        >
            <div className="w-full max-w-md">

                {/* Verifying */}
                {verificationStatus === "verifying" && (
                    <div className="text-center">

                        <div className="flex justify-center mb-6">
                            <LoaderCircle
                                size={56}
                                className="animate-spin text-primary"
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">
                            Verifying your email
                        </h1>

                        <p className="text-base-content/70">
                            Please wait while we verify your email address.
                        </p>

                    </div>
                )}

                {/* Success */}
                {verificationStatus === "success" && (
                    <div className="text-center">

                        <div className="flex justify-center mb-6">
                            <MailCheck
                                size={64}
                                className="text-success"
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">
                            Email Verified!
                        </h1>

                        <p className="text-base-content/70 mb-2">
                            {message}
                        </p>

                        <p className="text-sm text-base-content/70">
                            Redirecting you to the login page...
                        </p>

                    </div>
                )}

                {/* Error */}
                {verificationStatus === "error" && (
                    <div className="text-center">

                        <div className="flex justify-center mb-6">
                            <MailWarning
                                size={64}
                                className="text-error"
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">
                            Verification Failed
                        </h1>

                        <p className="text-base-content/70 mb-6">
                            {message}
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary w-full"
                            disabled
                        >
                            Resend Verification Email
                        </button>

                        <p className="text-sm text-base-content/60 mt-4">
                            Didn't receive the email? You can resend the
                            verification email here.
                        </p>

                    </div>
                )}

            </div>
        </motion.div>
    );
};

export default EmailVerificationPage;

