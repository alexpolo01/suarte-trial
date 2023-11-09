import FormError from '@/shared-components/error/components/FormError';
import PublicFormInput from '@/shared-components/inputs/components/PublicFormInput';

import './styles/PersonalizedTime.css';

export default function PersonalizedTime({ formState, setFormState, error }) {
  function updateFormState(key, value) {
    setFormState({
      ...formState,
      [key]: value
    });
  }

  return (
    <>
      <div className={`personalized-time__container ${formState.time_selected === "Personalized" ? "expanded" : ""}`}>
        <PublicFormInput 
          placeholder="Personalized" 
          element="time_quantity" 
          type="number"
          value={formState.time_selected === "Personalized" ? formState.time_quantity : ""}
          onChange={(e) => updateFormState("time_quantity", e.target.value)}
        />
                
        <PublicFormInput 
          placeholder="Time unit" 
          element="time_unit"
          type="select" 
          selectOptions={{ options: ["seconds", "minutes", "hours"] }}
          value={formState.time_selected === "Personalized" ? (formState.time_unit || "seconds") : ""}
          onChange={newValue => updateFormState("time_unit", newValue)}
        />

      </div>

      <FormError error={error} element="time_quantity"/>
    </>
  );
}
