import React, { useState, useEffect } from "react";
//@ts-ignore
import TagManager from "react-gtm-module";
import axios from "axios";
import "./styles.scss";

import { scrollTo } from "../utils";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head_bg from "../assets/hero5.png";
import one from "../assets/one.png";
import two from "../assets/two.png";
import Headline from "../assets/headline_spandeb1.png";

// google tag manager

const tagManagerArgs = {
  gtmId: "GTM-KZJBC3B",
};

TagManager.initialize(tagManagerArgs);

export default function Fifth_SP() {
  const SlideUp = cssTransition({
    enter: "toast-enter",
    exit: "toast-exit",
  });
  const messages = [
    "Emily A. Rodriguez from Miami, FL just qualified for a $3,600 Grocery Allowance.",
    "Michael D. Johnson from Dallas, TX just qualified for a $3,600 Grocery Allowance.",
    "Sophia L. Thompson from Los Angeles, CA just qualified for a $3,600 Grocery Allowance.",
    "Ethan M. Baker from Chicago, IL just qualified for a $3,600 Grocery Allowance.",
    "Ava K. Campbell from Seattle, WA just qualified for a $3,600 Grocery Allowance."
  ];
  //   const messages = x.map(message =>  `${message}\n32 sec ago`);
  const notify = (message: any) => {
    // Dismiss all existing toasts
    toast.dismiss();
    let boldedMessage = message;

    // Make the word "Allowance" bold in all lines
    boldedMessage = boldedMessage.replace(
      /\$3,600 Grocery Allowance/g,
      '<strong class="green-bold">$3,600 Grocery Allowance</strong>'
    );

    // Make specific dollar amounts bold only in specific lines
    const specialAmounts = ["$16,800", "$16,800", "$16,800", "$16,800"];
    specialAmounts.forEach((amount) => {
      if (message.includes(amount)) {
        boldedMessage = boldedMessage.replace(
          amount,
          `<strong class="green-bold">${amount}</strong>`
        );
      }
    });
    // Show new toast
    // toast(<div dangerouslySetInnerHTML={{ __html: boldedMessage }} />, {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   hideProgressBar: true,
    //   closeOnClick: false,
    //   pauseOnHover: true,
    //   draggable: true,
    //   closeButton: false,
    // });
  };
  useEffect(() => {
    const delayedEffect = setTimeout(() => {
      // Create a function to handle the logic
      const showRandomToast = () => {
        const randomTime = 6000;
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        notify(randomMessage);
        return randomTime;
      };

      // Show the first toast
      let nextTime = showRandomToast();

      // Set up a recurring timer
      const timer = setInterval(() => {
        nextTime = showRandomToast();
      }, nextTime);

      // Cleanup
      return () => {
        clearInterval(timer);
      };
    }, 6000); // 6-second delay before the useEffect code runs

    // Cleanup for the setTimeout
    return () => {
      clearTimeout(delayedEffect);
    };
  }, []);
  // const [zipCode, setZipCode] = useState("");
  // useEffect(() => {
  //   const fetchUserLocation = async () => {
  //     try {
  //       const response = await axios.get("https://ipapi.co/json/");
  //       console.log('response',response.data);
  //       setZipCode(response.data.postal);
  //     } catch (error) {
  //       console.error("Error fetching user location:", error);
  //     }
  //   };

  //   fetchUserLocation();
  // }, []);
  useEffect(() => {
    window.document.title = "Senior's Allowance Program 2024";

    axios
      .get(process.env.REACT_APP_PROXY + `/visits/8`)
      .then(({ data }) => {
        if (data.length === 0) {
          const visits = {
            visits: 1,
            views: 0,
            calls: 0,
            positives: 0,
            negatives: 0,
          };

          axios
            .post(
              process.env.REACT_APP_PROXY + `/visits/create-visits8`,
              visits
            )
            .catch((err) => console.log(err));
        } else {
          const _id = data[0]._id;
          const _visits = data[0].visits;
          const _views = data[0].views;
          const _calls = data[0].calls;
          const _positives = data[0].positives;
          const _negatives = data[0].negatives;

          const visits = {
            visits: _visits + 1,
            views: _views,
            calls: _calls,
            positives: _positives,
            negatives: _negatives,
          };
          axios
            .put(
              process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
              visits
            )
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCall = () => {
    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls + 1,
        positives: _positives,
        negatives: _negatives,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };

  const [quiz, setQuiz] = useState("Are you over the age of 64?  ");
  const [step, setStep] = useState("process");
  const [min, setMin] = useState(3);
  const [second, setSecond] = useState<any>(0);
  const [yes,setYes]=useState("YES")
  const [no,setNo]=useState("NO")
  

  const stepProcess = () => {
    if (step === "Reviewing Your Answers...") {
      setTimeout(() => {
        setStep("Matching With Best Options...");
      }, 1500);
    }
    if (step === "Matching With Best Options...") {
      setTimeout(() => {
        setStep("Confirming Eligibility...");
      }, 1500);
    }
    if (step === "Confirming Eligibility...") {
      setTimeout(() => {
        setStep("completed");

        axios
          .get(process.env.REACT_APP_PROXY + `/visits/8`)
          .then(({ data }) => {
            const _id = data[0]._id;
            const _visits = data[0].visits;
            const _views = data[0].views;
            const _calls = data[0].calls;
            const _positives = data[0].positives;
            const _negatives = data[0].negatives;
            const visits = {
              visits: _visits,
              views: _views + 1,
              calls: _calls,
              positives: _positives,
              negatives: _negatives,
            };
            axios
              .put(
                process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
                visits
              )
              .catch((err) => console.log(err));
          });
      }, 1500);
    }

    if (step === "completed") {
      const startTime: any = new Date();
      const timer = setInterval(() => {
        const nowTime: any = new Date();
        setSecond((180 - Math.round((nowTime - startTime) / 1000)) % 60);
        setMin(
          Math.floor((180 - Math.round((nowTime - startTime) / 1000)) / 60)
        );
      }, 1000);
    }
  };

  useEffect(() => {
    stepProcess();
    console.log("ht");
  }, [step]);

  const topScroll = (id: any) => {
    scrollTo({ id });
  };

  const handleQuizP = () => {
    topScroll("btn");
    if (quiz === "Are you over the age of 64?  ") {
      setYes("Yes")
      setNo("No")
      setQuiz("2. Do you live in the United States?");
    } else {
      setStep("Reviewing Your Answers...");
     
      topScroll("top");
    }

    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls,
        positives: _positives + 1,
        negatives: _negatives,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };

  const handleQuizN = () => {
    topScroll("btn");
    if (quiz === "Are you over the age of 60?  ") {
      setYes("Yes")
      setNo("No")
      setQuiz("2. Do you live in the United States?");
    } else {
      setStep("Reviewing Your Answers...");
    
      topScroll("top");
    }

    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls,
        positives: _positives,
        negatives: _negatives + 1,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };

  return (
    <div>
      <div style={{marginBottom:'4px'}} className="top-sticky-blue-test2" id="top">
      Senior's Allowance Program 2024
      </div>
      {step === "process" ? (
        <>
          <div className="main-container-5">
            <div className="main-descrition-5-5">
              <div className="main-des-title-6-7">
                <b>
                Claim Your Food Allowance Card Worth $900!
                </b>
                <span style={{"color": "#fde047"}}>&nbsp;(LAST CHANCE)</span>
              </div>
              {/* <img className='topic-img-larger' src = {Headline} alt = "head"/> */}
              <img className="topic-img-middle-z" src={Head_bg} alt="head" />
              {/* <div  style={{marginTop:'14px'}}className="main-des-5">
              Americans over 65 years old can claim the 2024 Grocery Allowance Card that gives them up to $3600. Americans can use the funds to fully cover their Groceries, Medicines, etc. at Walmart and thousands of other participating stores!

              </div> */}
              {/* <div className="main-des-5"  style={{marginTop:'-5px'}}>
              If you have not yet claimed your monthly allowance then answer the questions below and once approved <b>you will have your $3,600 Grocery Allowance mailed to you within a few days ready for use!</b>
              </div> */}
              {/* <div className='main-des-5' style = {{marginTop:"1rem"}}><b>Simplemente responda las siguientes preguntas:</b></div> */}
            </div>
            <div style={{marginTop:'-5px'}} className="survey">
              <div className="quiz-5" id="btn">
                {quiz}
              </div>
              <div  className="answer">
                <div className="answer-btn-5 answer-yes" onClick={handleQuizP}>
              {yes}
                </div>
                <div className="answer-btn-5 answer-no" onClick={handleQuizN}>
              {no}
                </div>
              </div>
            </div>
            <img style={{marginTop: "40px"}} className="topic-img-middle-z" src={one} alt="head" />
            <div className='' style = {{marginTop:"1rem", textAlign: "center", padding: "0 10%", fontSize: "10px"}}><b>Find D-SNPs from Medicare Advantage carriers like Humana,
            UnitedHealthcare® and Aetna.</b></div>
            <img style={{margin: "94% 0% 8% 0%"}} className="topic-img-middle-z" src={two} alt="head" />
            <div className="main-des-5"  style={{marginTop:'-5px'}}>
            Participating sales agencies represent
            Medicare Advantage [HMO, HMO SNP, PPO, PPO SNP and PFFS] organizations and Medicare-approved Part D sponsors that are contracted with Medicare. Enrollment depends on the plan's contract renewal with Medicare.
              </div>
              <div className="main-des-5"  style={{marginTop:'-5px'}}>We do not offer every plan available in your area. Currently we represent over 22 organizations which offer 38 products in your area. Please contact Medicare.gov, 1- 800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all of your options.
              </div>
              <div className="main-des-5"  style={{marginTop:'-5px'}}>Not affiliated with or endorsed by any government agency. This is a solicitation of insurance. There is absolutely no obligation to enroll. At General-Medicare.com you will talk with a licensed insurance agent in your state. Enrollment in a plan may be limited to certain times of the year unless you qualify for a special enrollment period or you are in your Medicare Initial Election Period.
              </div>
          </div>
        </>
      ) : step !== "process" && step !== "completed" ? (
        <div className="checking" style={{ fontWeight: "700" }}>
          {step}
        </div>
      ) : (
        <div className="checking">
          <div className="congrats">Congratulation, You Qualify!</div>
          <div className="top-description-5">
            Make A <b>Quick Call</b> To Claim Your Grocery Allowance!
          </div>
          <div className="spots-count">Spots remaining: 4</div>
          <div className="tap-direction">👇 TAP BELOW TO CALL 👇</div>
          <a href="tel:+18775370627">
            <div className="call-btn" onClick={handleCall}>
CALL (877) 537-0627
            </div>
          </a>
          <div className="sub-title">We Have Reserved Your Spot</div>
          <div className="sub-description">
            Due to high call volume, your official agent is waiting for only{" "}
            <b>3 minutes</b>, then your spot will not be reserved.
          </div>
          <div className="timer">
            <div className="timer-cell">{min}</div>
            <div className="timer-cell">:</div>
            <div className="timer-cell">{second}</div>
          </div>
        </div>
      )}
      <div className="footer">
        <div className="terms">Terms & Conditions | Privacy Policy</div>
        <div className="copyright">
          Copyright © 2024 - All right reserved Daily America Savings.
        </div>
        {/* <p>{zipCode} </p> */}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
