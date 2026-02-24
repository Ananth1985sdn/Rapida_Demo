import {
  AssistantDefinition,
  ConnectionConfig,
  CreatePhoneCall,
  CreatePhoneCallRequest,
  StringToAny,
} from "@rapidaai/react";
import clsx from "clsx";
import React, { useState } from "react";
export const MakePhoneCall = () => {
  //
  let connectionCfg = ConnectionConfig.DefaultConnectionConfig(
    ConnectionConfig.WithSDK({
      ApiKey: "{API_KEY}",
      UserId: "random-user / identified-user",
    })
  );
  //   .withLocal();

  const countries = [
    { name: "Afghanistan", value: "+93", code: "AF" },
    { name: "Albania", value: "+355", code: "AL" },
    { name: "Algeria", value: "+213", code: "DZ" },
    { name: "Andorra", value: "+376", code: "AD" },
    { name: "Angola", value: "+244", code: "AO" },
    { name: "Argentina", value: "+54", code: "AR" },
    { name: "Armenia", value: "+374", code: "AM" },
    { name: "Australia", value: "+61", code: "AU" },
    { name: "Austria", value: "+43", code: "AT" },
    { name: "Azerbaijan", value: "+994", code: "AZ" },
    { name: "Bahrain", value: "+973", code: "BH" },
    { name: "Bangladesh", value: "+880", code: "BD" },
    { name: "Belgium", value: "+32", code: "BE" },
    { name: "Brazil", value: "+55", code: "BR" },
    { name: "Bulgaria", value: "+359", code: "BG" },
    { name: "Cambodia", value: "+855", code: "KH" },
    { name: "Cameroon", value: "+237", code: "CM" },
    { name: "Canada", value: "+1", code: "CA" },
    { name: "Chile", value: "+56", code: "CL" },
    { name: "China", value: "+86", code: "CN" },
    { name: "Colombia", value: "+57", code: "CO" },
    { name: "Costa Rica", value: "+506", code: "CR" },
    { name: "Croatia", value: "+385", code: "HR" },
    { name: "Czech Republic", value: "+420", code: "CZ" },
    { name: "Denmark", value: "+45", code: "DK" },
    { name: "Egypt", value: "+20", code: "EG" },
    { name: "Estonia", value: "+372", code: "EE" },
    { name: "Finland", value: "+358", code: "FI" },
    { name: "France", value: "+33", code: "FR" },
    { name: "Germany", value: "+49", code: "DE" },
    { name: "Greece", value: "+30", code: "GR" },
    { name: "Hong Kong", value: "+852", code: "HK" },
    { name: "Hungary", value: "+36", code: "HU" },
    { name: "Iceland", value: "+354", code: "IS" },
    { name: "India", value: "+91", code: "IN" },
    { name: "Indonesia", value: "+62", code: "ID" },
    { name: "Iran", value: "+98", code: "IR" },
    { name: "Iraq", value: "+964", code: "IQ" },
    { name: "Ireland", value: "+353", code: "IE" },
    { name: "Israel", value: "+972", code: "IL" },
    { name: "Italy", value: "+39", code: "IT" },
    { name: "Japan", value: "+81", code: "JP" },
    { name: "Jordan", value: "+962", code: "JO" },
    { name: "Kazakhstan", value: "+7", code: "KZ" },
    { name: "Kenya", value: "+254", code: "KE" },
    { name: "Kuwait", value: "+965", code: "KW" },
    { name: "Latvia", value: "+371", code: "LV" },
    { name: "Lebanon", value: "+961", code: "LB" },
    { name: "Lithuania", value: "+370", code: "LT" },
    { name: "Luxembourg", value: "+352", code: "LU" },
    { name: "Malaysia", value: "+60", code: "MY" },
    { name: "Maldives", value: "+960", code: "MV" },
    { name: "Malta", value: "+356", code: "MT" },
    { name: "Mexico", value: "+52", code: "MX" },
    { name: "Monaco", value: "+377", code: "MC" },
    { name: "Morocco", value: "+212", code: "MA" },
    { name: "Nepal", value: "+977", code: "NP" },
    { name: "Netherlands", value: "+31", code: "NL" },
    { name: "New Zealand", value: "+64", code: "NZ" },
    { name: "Nigeria", value: "+234", code: "NG" },
    { name: "Norway", value: "+47", code: "NO" },
    { name: "Oman", value: "+968", code: "OM" },
    { name: "Pakistan", value: "+92", code: "PK" },
    { name: "Peru", value: "+51", code: "PE" },
    { name: "Philippines", value: "+63", code: "PH" },
    { name: "Poland", value: "+48", code: "PL" },
    { name: "Portugal", value: "+351", code: "PT" },
    { name: "Qatar", value: "+974", code: "QA" },
    { name: "Romania", value: "+40", code: "RO" },
    { name: "Russia", value: "+7", code: "RU" },
    { name: "Saudi Arabia", value: "+966", code: "SA" },
    { name: "Serbia", value: "+381", code: "RS" },
    { name: "Singapore", value: "+65", code: "SG" },
    { name: "Slovakia", value: "+421", code: "SK" },
    { name: "Slovenia", value: "+386", code: "SI" },
    { name: "South Africa", value: "+27", code: "ZA" },
    { name: "South Korea", value: "+82", code: "KR" },
    { name: "Spain", value: "+34", code: "ES" },
    { name: "Sri Lanka", value: "+94", code: "LK" },
    { name: "Sweden", value: "+46", code: "SE" },
    { name: "Switzerland", value: "+41", code: "CH" },
    { name: "Syria", value: "+963", code: "SY" },
    { name: "Taiwan", value: "+886", code: "TW" },
    { name: "Thailand", value: "+66", code: "TH" },
    { name: "Turkey", value: "+90", code: "TR" },
    { name: "Ukraine", value: "+380", code: "UA" },
    { name: "United Arab Emirates", value: "+971", code: "AE" },
    { name: "United Kingdom", value: "+44", code: "GB" },
    { name: "United States", value: "+1", code: "US" },
    { name: "Uruguay", value: "+598", code: "UY" },
    { name: "Uzbekistan", value: "+998", code: "UZ" },
    { name: "Venezuela", value: "+58", code: "VE" },
    { name: "Vietnam", value: "+84", code: "VN" },
    { name: "Yemen", value: "+967", code: "YE" },
    { name: "Zimbabwe", value: "+263", code: "ZW" },
  ];
  const [country, setCountry] = useState({
    name: "Singapore",
    value: "+65",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [argumentMap, setArgumentMap] = useState<Map<string, string>>(
    new Map()
  );

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    setPhoneNumber(value);
    setError("");
  };

  const validatePhoneNumber = () => {
    if (!country.value) {
      setError("Please select a country");
      return false;
    }
    if (phoneNumber.length < 7 || phoneNumber.length > 15) {
      setError("Please enter a valid phone number for call.");
      return false;
    }
    return true;
  };

  const onChangeArgument = (k: string, vl: string) => {
    setArgumentMap((prev) => {
      const updatedMap = new Map(prev);
      updatedMap.set(k, vl);
      return updatedMap;
    });
  };

  const handleSubmit = () => {
    if (validatePhoneNumber()) {
      const phoneCallRequest = new CreatePhoneCallRequest();
      const assistant = new AssistantDefinition();
      assistant.setAssistantid("ASSISTANT_ID");
      assistant.setVersion("latest");
      phoneCallRequest.setAssistant(assistant);
      argumentMap.forEach((value, key) => {
        phoneCallRequest.getArgsMap().set(key, StringToAny(value));
      });

      //   phoneCallRequest.setFromnumber('FROM_NUMBER');
      phoneCallRequest.setTonumber(country.value + phoneNumber);
      CreatePhoneCall(connectionCfg, phoneCallRequest)
        .then((x) => {
          if (x.getSuccess()) {
            setSuccess("Call has been create successfully.");
            setTimeout(() => setSuccess(""), 60000);
            return;
          }
          let err = x.getError();
          if (err?.getHumanmessage()) setError(err?.getHumanmessage());
        })
        .catch((x) => {
          setError("Unable to start the call, please try again.");
        });
    }
  };

  return (
    <div className="h-[100dvh] flex justify-center ">
      <div className="border-gray-200 border dark:border-gray-800 !w-[700px] mx-auto my-auto shadow dark:text-gray-300 text-gray-700">
        <div className="space-y-6 m-10">
          <div className="space-y-2">
            <h1 className="text-3xl">Hello,</h1>
            <h3 className="text-xl opacity-80">
              How can I help you with your call today?
            </h3>
          </div>
          <div className="mt-8">
            <div
              className={clsx(
                "p-[1px]",
                "!text-sm",
                "outline outline-transparent",
                "focus-within:outline-blue-600 focus:outline-blue-600 outline-offset-[-1px]",
                "border-b border-gray-400 dark:border-gray-600",
                "dark:focus-within:border-blue-600 focus-within:border-blue-600",
                "transition-all duration-200 ease-in-out",
                "flex relative"
              )}
            >
              <div className="w-44 relative">
                <select
                  className="w-full h-10 cursor-pointer py-2 pl-3 pr-10 text-left focus:ring-0 transition-all duration-200 dark:bg-gray-950 bg-white text-gray-600 dark:text-gray-300"
                  value={country.value} // Set default selected value
                  onChange={(event) => {
                    const selectedCountry = countries.find(
                      (c) => c.value === event.target.value
                    );
                    if (selectedCountry) {
                      setCountry(selectedCountry);
                    }
                  }}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {countries.map((countryOption) => (
                    <option
                      key={countryOption.value}
                      value={countryOption.value}
                    >
                      {countryOption.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full form-input h-10 dark:placeholder-gray-600 placeholder-gray-400 dark:text-gray-300 text-gray-600 outline outline-[1.5px] outline-transparent focus-within:outline-blue-600 focus:outline-blue-600 outline-offset-[-1.5px] border-b border-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:border-blue-600 transition-all duration-200 ease-in-out px-2 py-1.5 pl-3 bg-white max-w-full dark:bg-gray-950 focus-within:!border-none focus-within:!outline-none !border-none"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="flex h-10 dark:border-[1.4px] border-gray-900 truncate w-fit justify-center items-center cursor-pointer text-white py-2.5 px-3  bg-blue-600 hover:bg-blue-700 button focus:outline-none"
              onClick={handleSubmit}
            >
              Start Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
