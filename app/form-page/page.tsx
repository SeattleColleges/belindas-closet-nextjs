'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  gender: string;
  email: string;
  size: string;
}

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    email: '',
    size: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Test if all fields are filled out
    if (formData.name && formData.gender && formData.email && formData.size) {
      alert('Form submitted successfully!');
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div>
      <h1>Belinda&apos;s Closet Student Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-Binary</option>
          </select>
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g., S, M, L, XL"
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}