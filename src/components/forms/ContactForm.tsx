export default function ContactForm() {
  return (
    <div className="container max-w-full" id="contact-section">
      <h1 className="flex justify-center py-4 sm:py-9 text-red-700 text-2xl sm:text-4xl">
        Contact me
      </h1>
      <form className="flex flex-col justify-center items-center">
        <div className="relative pb-6 w-[20rem] sm:w-[27rem]">
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full py-2.5 px-2 text-base text-white bg-transparent rounded border border-[#8A0303] appearance-none dark:text-white dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute top-0  text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your email
          </label>
        </div>

        <div className="relative z-0 w-[20rem] sm:w-[27rem]">
          <textarea
            id="message"
            name="message"
            className="block w-full resize-none py-2.5 px-2 h-[9rem] text-base text-white bg-transparent rounded border border-[#8A0303] appearance-none dark:text-white dark:border-[#8A0303] dark:focus:border-red-700 focus:outline-none focus:ring-0 focus:border-red-700 peer"
            placeholder=" "
          />
          <label
            htmlFor="message"
            className="absolute top-0 text-base bg-[#080808] text-[#8A0303] dark:text-[#8A0303] duration-300 transform -translate-y-6 scale-75 origin-[0] peer-focus:left-0 peer-focus:text-red-700 peer-focus:dark:text-red-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Message
          </label>
        </div>

        <div className="flex items-center justify-center p-5">
          <button
            className="bg-transparent text-red-700 font-bold py-2 px-4 rounded-2xl border-2 border-[#8A0303]"
            type="button"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
