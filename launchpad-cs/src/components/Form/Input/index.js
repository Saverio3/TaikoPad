// ! import icon
import LogoURLIcon from "@/assets/icons/logoURL-input.svg";
import ExportedImage from "next-image-export-optimizer";

import Image from "next/image";

const Input = ({
    label = "",
    type = "text",
    value = "",
    onChange = "",
    placeholder = "",
    required = false,
    icon = "",
    error = "",
    name = 'input'
}) => {
    return (
        <div className="flex flex-col gap-2 w-[100%] relative">
            {
            label && (
                <p className="text-white text-[14px]">
                    {label}
                    {
                    required && <span className="text-[#C03F4A]">*</span>
                } </p>
            )
        }
            <div className="relative">
                {
                icon && (
                    <ExportedImage src={icon}
                        alt="icon"
                        className="absolute bottom-[22px] left-4"/>
                )
              }
                <input name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={
                        `w-[100%] h-[59px] text-white outline-none border border-[#2C2C2C] bg-[#141414] p-5 ${
                            icon && "pl-11"
                        }  rounded-lg text-[#86888C] text-sm`
                    }/>
                  
            </div>
            {
            value !== '' && error !== '' && <div className="error text-rose-600 text-[12px]">
                {error}</div>
        }
            {
            value === '' && <div className="error text-rose-600 text-[12px]">
                {label}
                is a required field</div>
        }
            {
            value === 0 && <div className="error text-rose-600 text-[12px]">
                {label}
                is a required field</div>
        }
            {
            value === '0' && <div className="error text-rose-600 text-[12px]">
                {label}
                is a required field</div>
        } </div>
    );
};

export default Input;
