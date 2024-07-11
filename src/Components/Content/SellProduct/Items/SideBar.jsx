import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { SortingContext } from "../Sort/SortingContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { DataContext } from "../Sort/DataContext";

export default function SideBar({ initialCategory }) {
  const { setSortOption } = useContext(SortingContext);
  const [caratWeight, setCaratWeight] = useState([0.55, 1.75]);
  const { setApiUrl } = useContext(DataContext);
  const [filters, setFilters] = useState({
    Cut: [],
    Clarity: [],
    Color: [],
    Origin: [],
    Gender: [],
    Category: initialCategory ? [initialCategory] : [],
    Material: [],
  });
  const isInitialLoad = useRef(true);

  // Save user filter
  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    const savedCaratWeight = localStorage.getItem("caratWeight");
    const savedApiUrl = localStorage.getItem("apiUrl");

    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }

    if (savedCaratWeight) {
      setCaratWeight(JSON.parse(savedCaratWeight));
    }

    if (savedApiUrl) {
      setApiUrl(savedApiUrl);
    } else {
      const query = buildQuery(
        savedCaratWeight ? JSON.parse(savedCaratWeight) : caratWeight,
        savedFilters ? JSON.parse(savedFilters) : filters
      );
      const initialApiUrl = `https://diamondstoreapi.azurewebsites.net/api/Products?${query}`;
      setApiUrl(initialApiUrl);
      localStorage.setItem("apiUrl", initialApiUrl);
    }

    isInitialLoad.current = false;
  }, [setApiUrl]);

  useEffect(() => {
    if (initialCategory) {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, Category: [initialCategory] };
        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        return updatedFilters;
      });
    }
  }, [initialCategory]);

  const handleRadioChange = useCallback(
    (value) => {
      setSortOption(value);
    },
    [setSortOption]
  );

  const handleSliderChange = useCallback((newValue) => {
    setCaratWeight(newValue);
    localStorage.setItem("caratWeight", JSON.stringify(newValue));
  }, []);

  const handleCheckboxChange = useCallback((groupName, value) => {
    setFilters((prevFilters) => {
      const groupValues = prevFilters[groupName];
      const newValues = groupValues.includes(value)
        ? groupValues.filter((v) => v !== value)
        : [...groupValues, value];
      const updatedFilters = { ...prevFilters, [groupName]: newValues };
      localStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  }, []);

  const buildQuery = (caratWeight, filters) => {
    const params = {
      MinCaratWeight: caratWeight[0],
      MaxCaratWeight: caratWeight[1],
      ...Object.fromEntries(
        Object.entries(filters)
          .filter(([_, values]) => values.length)
          .map(([key, values]) => [key, values.join(",")])
      ),
    };
    return new URLSearchParams(params).toString();
  };

  useEffect(() => {
    if (!isInitialLoad.current) {
      const query = buildQuery(caratWeight, filters);
      const newApiUrl = `https://diamondstoreapi.azurewebsites.net/api/Products?${query}`;
      setApiUrl(newApiUrl);
      localStorage.setItem("apiUrl", newApiUrl);
    }
  }, [caratWeight, filters, setApiUrl]);

  return (
    <div className="relative w-[20%] border-t-[0.1em] border-t-black border-opacity-10">
      <div className={`w-full`}>
        <div className="flex flex-col justify-center items-start">
          <div className="text uppercase mt-5">sort by</div>
          {radioOptions.map((title, index) => (
            <RadioCheck
              key={index}
              title={title}
              index={index}
              onChange={handleRadioChange}
            />
          ))}
          <div className="w-full h-26 mt-5">
            <div className="text uppercase mb-5">Carat weight</div>
            <div className="">
              <Slider
                range
                min={0.55}
                max={1.75}
                step={0.01}
                defaultValue={0.75}
                onChange={handleSliderChange}
                value={caratWeight}
                allowCross={false}
                trackStyle={[{ backgroundColor: "black", height: "8px" }]}
                handleStyle={[
                  {
                    borderColor: "#54cc26",
                    height: 18,
                    width: 18,
                    backgroundColor: "green",
                    opacity: 100,
                  },
                  {
                    borderColor: "#54cc26",
                    height: 18,
                    width: 18,
                    backgroundColor: "green",
                    opacity: 100,
                  },
                ]}
                railStyle={{ backgroundColor: "green", height: "8px" }}
              />
            </div>
            <div className="mt-5">
              Carat Weight: {caratWeight[0]} - {caratWeight[1]}
            </div>
          </div>
          <div className="text uppercase mt-5">Cut</div>
          {cutOptions.map((title, index) => (
            <SquareCheck
              key={index}
              title={title}
              index={index}
              groupName="Cut"
              onChange={handleCheckboxChange}
              isChecked={filters.Cut.includes(title)}
            />
          ))}
          <div className="text uppercase mt-5">Clarity</div>
          {ClarityOptions.map((title, index) => (
            <SquareCheck
              key={index}
              title={title}
              index={index}
              groupName="Clarity"
              onChange={handleCheckboxChange}
              isChecked={filters.Clarity.includes(title)}
            />
          ))}
          <div className="text uppercase mt-5">Color</div>
          {ColorOptions.map((title, index) => (
            <SquareCheck
              key={index}
              title={title}
              index={index}
              groupName="Color"
              onChange={handleCheckboxChange}
              isChecked={filters.Color.includes(title)}
            />
          ))}
          <div className="text uppercase mt-5">Origin</div>
          {OriginOptions.map((title, index) => (
            <SquareCheck
              key={index}
              title={title}
              index={index}
              groupName="Origin"
              onChange={handleCheckboxChange}
              isChecked={filters.Origin.includes(title)}
            />
          ))}
          <div className="text uppercase mt-5">Select for</div>
          {selectForOptions.map((title, index) => (
            <SquareCheck
              key={index}
              title={title}
              index={index}
              groupName="Gender"
              onChange={handleCheckboxChange}
              isChecked={filters.Gender.includes(title)}
            />
          ))}
          <div className="text uppercase mt-5">Category</div>
          {categoryOptions.map((title, index) => (
            <SquareCheck
              key={index}
              title={title}
              index={index}
              groupName="Category"
              onChange={handleCheckboxChange}
              isChecked={filters.Category.includes(title)}
            />
          ))}
          <div className="text uppercase mt-5">Material</div>
          {metalOptions.map((title, index) => (
            <SquareCheck
              key={index}
              title={title}
              index={index}
              groupName="Material"
              onChange={handleCheckboxChange}
              isChecked={filters.Material.includes(title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const RadioCheck = ({ title, index, onChange }) => {
  const inputId = `radio${index}`;
  return (
    <div className="flex w-full mt-3">
      <label htmlFor={inputId} className="radio-label">
        <input
          type="radio"
          id={inputId}
          name="radio"
          className="radio-input"
          onChange={() => onChange(title)}
        />
        <div className="custom-radio"></div>
        <p className="uppercase hover:underline text-[0.9em] ml-2">{title}</p>
      </label>
    </div>
  );
};

const SquareCheck = ({
  title,
  index,
  type = "checkbox",
  groupName,
  onChange,
  isChecked = false,
}) => {
  const inputId = `${groupName}-${index}`;
  return (
    <div className="flex w-full mt-3">
      <label htmlFor={inputId} className="checkbox-label">
        <input
          type={type}
          id={inputId}
          name={groupName}
          className="checkbox-input"
          onChange={() => onChange(groupName, title)}
          checked={isChecked}
        />
        <span className="custom-checkbox"></span>
        <p className="uppercase text-[0.9em] hover:underline ml-2">{title}</p>
      </label>
    </div>
  );
};

const radioOptions = ["price low to high", "price high to low", "recommended"];
const cutOptions = ["Excellent", "Very Good", "Good"];
const ClarityOptions = [
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "I1",
  "I2",
];
const ColorOptions = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const OriginOptions = ["Synthetic", "Natural"];
const categoryOptions = ["Rings", "Earrings", "Bracelets", "Necklaces"];
const selectForOptions = ["Female", "Male", "Unisex"];
const metalOptions = [
  "Gold",
  "Silver",
  "Platinum",
  "Palladium",
  "Titanium",
  "White Gold",
];
