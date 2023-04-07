import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import "./Form.css";

const Form = ({ onNewUser }) => {
  const [formValues, setFormValues] = useState({
    isim: "",
    soyisim: "",
    email: "",
    sifre: "",
    termsAccepted: false,
  });

  const formSchema = Yup.object().shape({
    isim: Yup.string().required("İsim zorunlu bir alandır"),
    soyisim: Yup.string().required("Soyisim zorunlu bir alandır"),
    email: Yup.string().email("Geçerli bir e-posta adresi girin").required("E-posta zorunlu bir alandır"),
    sifre: Yup.string().min(6, "Şifre en az 6 karakter uzunluğunda olmalıdır").required("Şifre zorunlu bir alandır"),
    termsAccepted: Yup.boolean().oneOf([true], "Kullanım Şartlarını kabul etmelisiniz"),
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await formSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      const response = await axios.post("https://reqres.in/api/users", formValues);
      onNewUser(response.data);
      setFormValues({
        isim: "",
        soyisim: "",
        email: "",
        sifre: "",
        termsAccepted: false,
      });
    } catch (err) {
      setErrors(err.inner.reduce((acc, { path, message }) => ({ ...acc, [path]: message }), {}));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="isim" value={formValues.isim} onChange={handleChange} placeholder="İsim" />
      {errors.isim && <p>{errors.isim}</p>}
      <input type="text" name="soyisim" value={formValues.soyisim} onChange={handleChange} placeholder="Soyisim" />
      {errors.soyisim && <p>{errors.soyisim}</p>}
      <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="E-posta" />
      {errors.email && <p>{errors.email}</p>}
      <input type="password" name="sifre" value={formValues.sifre} onChange={handleChange} placeholder="Şifre" />
      {errors.sifre && <p>{errors.sifre}</p>}
      <label className="term-container">
        <input type="checkbox" name="termsAccepted" checked={formValues.termsAccepted} onChange={(e) => setFormValues({ ...formValues, termsAccepted: e.target.checked })} />
        Kullanım Şartları'nı kabul   ediyorum.
      </label>
      {errors.termsAccepted && <p>{errors.termsAccepted}</p>}
      <button type="submit">Gönder</button>
    </form>
  );
};

export default Form;
