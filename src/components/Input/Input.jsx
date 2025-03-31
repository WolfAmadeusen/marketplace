const InputMain = ({ type, placeholder, value, onChange = () => { } }) => {
   return (
      <input
         placeholder={placeholder}
         type={type}
         value={value}
         onChange={onChange}
      />
   );
};

export default InputMain;