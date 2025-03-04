import { useState, useRef } from "react";
import ReactFlagsSelect from "react-flags-select";
import tickety from "../assets/tickety.png";
import { RiUploadCloudFill } from "react-icons/ri";
import eventImage from "../assets/events-image.png";
import uploadImage from "../assets/upload.png";
import Input from "../components/Input";
import EventSuccess from "./EventSuccess";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import Label from "../components/Label";
import axios from "axios";
import { useAuthContext } from "../store/auth-context";

const api = import.meta.env.VITE_APP_API_URL;

const options = [
  { value: "party", label: "Party" },
  { value: "confernece", label: "Conference" },
  { value: "concert", label: "Concert" },
  { value: "tech", label: "Tech Event" },
  { value: "other", label: "Other" },
];

const CreateEvent = () => {
  const { token, user } = useAuthContext();
  console.log(token);
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginIsLoading, setLoginIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      location: "",
    },
  });

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const onSubmit = (data) => {
    // try {
    //   const response = await createEvent(data);
    //   if (response) {
    //     openModal();
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    // }
    setLoginIsLoading(true);

    axios
      .post(`${api}/events`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setLoginIsLoading(false);
        openModal();
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setLoginIsLoading(false);
        setLoginError(err.response.data.error);
      });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex w-full">
        <EventSuccess isOpen={isModalOpen} closeModal={closeModal} />
        <div
          className="hidden md:block w-1/3 bg-center bg-cover"
          style={{ backgroundImage: `url(${eventImage})` }}
        >
          <div className="flex">
            <Link onClick={() => navigate(-1)}>
              <FaArrowAltCircleLeft
                className="arrow-icon mt-8 ml-8 cursor-pointer"
                fill="white"
                size={45}
              />
            </Link>
            <img
              src={tickety}
              alt="Logo Icon"
              className="px-2 ml-8 mt-8 w-40 hover:cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        <div className="md:w-[65%] w-full py-6 px-3">
          <div>
            <h2 className="text-[#131B22] text-lg font-bold">
              Create your Event
            </h2>
            <p className="text-[#586675] text-sm font-normal mt-1">
              Kindly input your details below to create your event
            </p>
          </div>

          <div className="mt-6 mb-3">
            <p className="mb-1 text-[#212D3A] text-base">Upload event image</p>
            <span className="my-2 text-[#E33629]">{loginError}</span>

            <div
              className="p-10 flex justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${uploadImage})` }}
            >
              <input
                style={{ display: "none" }}
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                // accept=".jpg .jpeg .png"
              />
              <button
                className="bg-white border-[#806B77] border-2 p-5 rounded-lg"
                onClick={() => inputRef.current.click()}
              >
                <RiUploadCloudFill className="mx-auto upload-icon" size={20} />
                <p className="text-[#412234] flex justify-center text-sm font-semibold">
                  Upload Photos <br />
                  and Video
                </p>
              </button>
            </div>
            {fileName && (
              <div className="mt-1">
                <h2 className="text-base font-semibold mb-3 border border-[#806B77] w-max p-1 bg-[#806B77] rounded-lg">
                  {fileName}
                </h2>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-3">
              <Label htmlFor="event name">Event Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                register={register}
                required
                placeholder="Enter event name"
              />
              {errors.name && (
                <p className=" text-[#E33629] text-sm">
                  Event name is required
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="event description">About the event</Label>
              <textarea
                type="text"
                id="description"
                name="description"
                {...register("description", {
                  required: "Event description is required",
                })}
                className="mt-1 px-3 py-2 bg-[#eaecee] border-2 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm border-[#C4BAC0] placeholder:text-[#9FA7AF]"
                placeholder="Describe your event"
              />
              {errors.description && (
                <p className=" text-[#E33629] text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="options">Event Category</Label>
              <select
                id="category"
                name="category"
                {...register("category", {
                  required: "Select an event category",
                })}
                className="w-full px-3 py-3 text-sm bg-[#eaecee] border-2  border-[#C4BAC0] rounded-md shadow-sm focus:outline-none focus:border-sky-500"
              >
                <option disabled value="">
                  Select event category
                </option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    // selected={eventpreData.category === option.value}
                    value={option.value}
                    className="text-[#212D3A]"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className=" text-[#E33629] text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="location"> Location </Label>
              <Controller
                name="location"
                id="location"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactFlagsSelect
                    {...field}
                    selected={field.value}
                    onSelect={field.onChange}
                    className="bg-[#eaecee] react-flag-hide-padding-bottom"
                    placeholder="Enter location"
                  />
                )}
              />
              {errors.location && (
                <p className="text-[#E33629] text-sm">Location is required</p>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="date">Event Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                register={register}
                required
                placeholder="Enter event date"
                className="date-input"
              />
              {errors.date && (
                <p className=" text-[#E33629] text-sm">
                  Event date is required
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="time">Start Time</Label>
              <Input
                type="time"
                id="time"
                name="time"
                register={register}
                required
                placeholder="Enter event time"
                className="time-input"
              />
              {errors.time && (
                <p className=" text-[#E33629] text-sm">
                  Event time is required
                </p>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="RSVP">RSVP</Label>
              <Input
                type="number"
                id="RSVP"
                name="RSVP"
                register={register}
                required
                placeholder="Enter RSVP Number"
              />
              {errors.RSVP && (
                <p className=" text-[#E33629] text-sm">RSVP is required</p>
              )}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 w-full bg-[#412234] text-white font-semibold rounded shadow-md"
              >
                {loginIsLoading ? "Loading..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default CreateEvent;
