import React, { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import faqLottie from "../assets/faq-animation.json";

const FAQ = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        fetch("/faq.json")
            .then((res) => res.json())
            .then((data) => setFaq(data));
    }, []);

    return (
        <div className="py-20 px-5 md:px-24 bg-gradient-to-b from-[#e0f7fa] via-[#fce4ec] to-[#f3e5f5] rounded-3xl my-10">
            <div className="text-center mb-10">
                <div className="flex justify-center mb-6">
                    <div className="w-40 h-40">
                        <Lottie animationData={faqLottie} loop={true} />
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[#1f2c3f] mb-5">
                    Frequently Asked Question (FAQ)
                </h1>

                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Find answers to your most common questions about ParcelPulse — everything from safety to speed, we’ve got you covered to ensure the best delivery experience.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-5">
                {faq.map((item) => (
                    <Disclosure key={item.id}>
                        {({ open }) => (
                            <div className="border border-gray-300 rounded-2xl bg-white p-5 shadow-lg transition duration-300 hover:shadow-2xl">
                                <Disclosure.Button className="flex justify-between items-center w-full text-lg font-medium text-left text-[#1f2c3f]">
                                    {item.question}
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ${open ? "rotate-180 text-pink-500" : ""
                                            }`}
                                    />
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-300 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-200 ease-in"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="mt-4 text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </Disclosure.Panel>
                                </Transition>
                            </div>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
