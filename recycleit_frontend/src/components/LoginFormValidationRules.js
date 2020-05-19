export default function validate(values) {
  let errors = {};
  if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }if (!values.number) {
    errors.number = 'Email address is required';
  }
 
  
  return errors;
};
