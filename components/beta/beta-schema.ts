import * as yup from "yup";

export const roles = ["Owner / Founder", "Manager", "Operations lead", "Chef", "Other"];
export const restaurantTypes = ["Full-service restaurant", "Quick service / Fast casual", "Café / Coffee shop", "Bar / Lounge", "Bakery", "Food truck / Takeaway", "Other"];

export const betaSchema = yup.object({
  fullName: yup.string().trim().max(120).required("Enter your full name."),
  email: yup.string().trim().email("Enter a valid email address.").max(254).required("Enter your email address."),
  phone: yup.string().trim().required("Enter your phone number.").test("phone", "Enter a valid phone number, including your country code.", (value) => !!value && /^\+?[\d\s().-]+$/.test(value) && value.replace(/\D/g, "").length >= 7 && value.replace(/\D/g, "").length <= 15),
  restaurantName: yup.string().trim().max(160).required("Enter your restaurant name."),
  role: yup.string().oneOf(roles).required("Select your role."),
  restaurantType: yup.string().oneOf(restaurantTypes).required("Select your restaurant type."),
  location: yup.string().trim().max(200).required("Enter your city and country."),
  branches: yup.number().transform((value, original) => original === "" ? undefined : value).typeError("Enter a number.").integer("Enter a whole number.").min(1, "Enter at least 1 branch.").max(10000, "Enter a number below 10,001.").optional(),
});

export const initialValues = { fullName: "", email: "", phone: "", restaurantName: "", role: "", restaurantType: "", location: "", branches: "" };
