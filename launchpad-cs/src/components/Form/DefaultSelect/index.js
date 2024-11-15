const DefaultSelect = ({
  name="tokenType",
  label = "Token Type",
  required = false,
  placeholder = "",
  optons = [],
  onChange="",
  defaultValue=0,
}) => {
  return (
    <div className="flex flex-col gap-2 w-[100%]">
      {label && (
        <p className="text-white text-[14px]">
          {label}
          {required && <span className="text-[#C03F4A]">*</span>}
        </p>
      )}
      <select
        placeholder={placeholder}
        className="w-[100%] h-[59px] p-4 bg-[#141414] border border-[#2C2C2C] rounded-[8px] outline-none text-base text-[#86888C]"
        onChange={onChange}
        defaultValue={defaultValue}
        name={name}
      >
        {optons.map((item, index) => (
          <option value={item.value} key={index}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DefaultSelect;
