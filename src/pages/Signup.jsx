import { useState } from "react";
import FloatingInputLabel from "../components/FloatingInputLabel";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../config/firebase.config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email address is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formErrors = validateForm();

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
		} else {
			setErrors({});
			try {
				setLoading(true);
				const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

				const user = userCredential?.user;
				const userDocRef = doc(db, "users", user.uid);
				await setDoc(userDocRef, {});

				toast("Registration Successful.");
				navigate("/");
			} catch (error) {
				console.log(error.message);
				if (error.code === "auth/email-already-in-use") {
					toast("Email already in use. Please use a different email.");
				} else {
					toast("Something went wrong while signing up! Try again.");
				}
			} finally {
				setLoading(false);
			}
		}
	};

	const handleForgotPassword = async () => {
		if (/\S+@\S+\.\S+/.test(formData.email)) {
			try {
				await sendPasswordResetEmail(auth, formData.email);
				toast("Password reset email sent! Please check your inbox.");
			} catch (err) {
				console.log(err);
			}
		} else {
			toast("Enter your email to reset password.", {
				variant: "destructive",
			});
		}
	};

	return (
		<div className="min-h-screen px-5">
			<div className="py-4">
				<Link
					to="/"
					className="text-2xl font-futura text-transparent bg-clip-text bg-gradient-to-r from-primaryColor-400 via-primaryColor-700 to-primaryColor-900">
					Dog.CEO
				</Link>
			</div>
			<div className="w-full sm:w-[400px] pt-12 sm:pt-20 mx-auto">
				<h3 className="text-4xl font-futura text-center">Register</h3>
				<form className="mt-10 space-y-8" onSubmit={handleSubmit}>
					<div className="relative">
						<FloatingInputLabel
							placeholder={"youremail@address.com"}
							id="email"
							label={"Email"}
							type={"email"}
							name="email"
							onChange={handleChange}
							error={errors.email}
						/>
						{errors.email && <p className="text-sm px-2 font-medium mt-2 text-[#D94F14]">{errors.email}</p>}
					</div>
					<div className="relative">
						<FloatingInputLabel
							placeholder={"********"}
							id="password"
							label={"Password"}
							type={showPassword ? "text" : "password"}
							name={"password"}
							onChange={handleChange}
							error={errors.password}
						/>
						<span
							className="absolute cursor-pointer right-3 top-[28px] -translate-y-1/2"
							onClick={() => setShowPassword((prev) => !prev)}>
							<img
								src={showPassword ? "/assets/icons/Eye.svg" : "/assets/icons/EyeOff.svg"}
								className="w-[20px]"
								alt={"show/hide password icon"}
							/>
						</span>
						{errors.password && <p className="text-sm px-2 font-medium mt-2 text-[#D94F14]">{errors.password}</p>}
					</div>
					<div className="text-right !mt-2">
						<span
							className="text-primaryColor-700 font-medium text-sm cursor-pointer"
							onClick={handleForgotPassword}>
							Forgot Password?
						</span>
					</div>
					<div className="!mt-8">
						<Button
							type="submit"
							className={
								"w-full text-base gap-1 items-center disabled:!opacity-100 text-foreground h-auto !py-3"
							}
							disabled={loading}>
							{loading && <img src="/assets/icons/Hourglass.svg" alt="loading icon" className="w-[18px]" />}
							{loading ? "Loading" : "Sign Up"}
						</Button>
					</div>
					<div>
						<p className="text-center">
							Already have an account?{" "}
							<Link to="/login" className="text-primaryColor-800 font-medium">
								Login
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
