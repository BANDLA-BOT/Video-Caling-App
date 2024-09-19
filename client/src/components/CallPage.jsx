// import { useEffect, useReducer, useRef, useState } from "react";
// import Peer from "simple-peer";
// import { useParams, useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import CallPageFooter from "../UI/CallPageFooter";
// import CallPageHeader from "../UI/CallPageHeader";
// import MeetingInfo from "../UI/MeetingInfo";
// import Messenger from "../UI/Messenger";
// import MessageListReducer from "../reducer/MessageListReducer";
// import { getRequest, postRequest } from "../utils/apiRequests";
// import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../utils/apiEndpoints";
// import "./Styles/CallPage.scss";
// import Alert from "../UI/Alert";

// const socket = io.connect("http://localhost:5000");

// const initialState = [];

// const CallPage = () => {
//   const videoRef = useRef(null);
//   const peerRef = useRef(null);
//   const navigate = useNavigate();
//   const [streamObj, setStreamObj] = useState(null);
//   const [screenCastStream, setScreenCastStream] = useState(null);
//   const [meetingInfoPopUp, setMeetingInfoPopUp] = useState(false);
//   const [isPresenting, setIsPresenting] = useState(false);
//   const [isAudio, setIsAudio] = useState(true);
//   const [isMessenger, setIsMessenger] = useState(false);
//   const [messageAlert, setMessageAlert] = useState({});
//   const [messageList, messageListReducer] = useReducer(
//     MessageListReducer,
//     initialState
//   );
//   let { id } = useParams();
//   const isAdmin = window.location.hash === "#init";
//   const url = `${window.location.origin}${window.location.pathname}`;

//   const getRecieverCode = async () => {
//     const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
//     if (response?.code) {
//       peerRef.current.signal(response.code);
//     }
//   };

//   const initWebRTC = () => {
//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       console.error("getUserMedia not supported.");
//       return;
//     }

//     navigator.mediaDevices
//       .getUserMedia({
//         video: true,
//         audio: true,
//       })
//       .then((stream) => {
//         setStreamObj(stream);

//         peerRef.current = new Peer({
//           trickle: false,
//           initiator: isAdmin,
//           stream: stream,
//         });

//         const peer = peerRef.current;
//         if (!peer) {
//           console.log("Error while setting Peer");
//         }
//         if (!isAdmin) {
//           getRecieverCode();
//         }

//         peer.on("signal", async (data) => {
//           if (isAdmin) {
//             await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, {
//               id,
//               signalData: data,
//             });
//           } else {
//             socket.emit("code", { code: data, url }, () => {
//               console.log("code sent");
//             });
//           }
//         });

//         peer.on("connect", () => {
//           console.log("Peer connected");
//         });
//         peer.on("data", (data)=>{
//           clearTimeout(alertTimeout)
//           messageListReducer({
//             type:"addMessage",
//             payload:{
//               user:"other",
//               msg:data.toString(),
//               time:Date.now()
//             }
//           })
//           setMessageAlert({
//             alert:true,
//             isPopup:true,
//             payload:{
//               user:"other",
//               msg:data.toString()
//             }
//           })
//           alertTimeout= setTimeout(() => {
//             setMessageAlert({
//               ...messageAlert,
//               isPopup:false,
//               payload:{}
//             })
//           }, 10000);
//         })

//         peer.on("stream", (stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             videoRef.current.play();
//           }
//         });

//         peer.on("error", (err) => {
//           console.error("Peer error:", err);
//         });
//       })
//       .catch((error) => {
//         console.error("Error accessing media devices:", error.message);
//       });
//   };

//   const screenShare = () => {
//     navigator.mediaDevices
//       .getDisplayMedia({ cursor: true })
//       .then((screenStream) => {
//         const peer = peerRef.current;
//         peer.replaceTrack(
//           streamObj.getVideoTracks()[0],
//           screenStream.getVideoTracks()[0],
//           streamObj
//         );
//         setScreenCastStream(screenStream);
//         screenStream.getTracks()[0].onended = () => {
//           peer.replaceTrack(
//             screenStream.getVideoTracks()[0],
//             streamObj.getVideoTracks()[0],
//             streamObj
//           );
//         };
//         setIsPresenting(true);
//       });
//   };

//   const stopScreenShare = () => {
//     screenCastStream.getVideoTracks().forEach((track) => track.stop());
//     const peer = peerRef.current;
//     peer.replaceTrack(
//       screenCastStream.getVideoTracks()[0],
//       streamObj.getVideoTracks()[0],
//       streamObj
//     );
//     setIsPresenting(false);
//   };

//   const toggleAudio = (value) => {
//     streamObj.getAudioTracks()[0].enabled = value;
//     setIsAudio(value);
//   };

//   const disconnectCall = () => {
//     const peer = peerRef.current;
//     if (peer) {
//       peer.destroy();
//     }
//     navigate("/");
//     window.location.reload();
//   };

//   const sendMsg = (msg)=>{
//     const peer = peerRef.current
//     peer.send(msg)
//     messageListReducer({
//       type:"addMessage",
//       payload:{
//         user:"you",
//         msg:msg,
//         time:Date.now()
//       }
//     })
//   }

//   useEffect(() => {
//     if (isAdmin) {
//       setMeetingInfoPopUp(true);
//     }
//     initWebRTC();
//     socket.on("code", (data) => {
//       if (data.url === url) {
//         peerRef.current.signal(data.code);
//       }
//     });

//     return () => {
//       const peer = peerRef.current;
//       if (peer) {
//         peer.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="callpage-container">
//       <video ref={videoRef} className="video-container" controls></video>
//       <CallPageHeader
//         isMessenger={isMessenger}
//         setIsMessenger={setIsMessenger}
//         messageAlert={messageAlert}
//         setMessageAlert={setMessageAlert}
//       />
//       <CallPageFooter
//         isPresenting={isPresenting}
//         stopScreenShare={stopScreenShare}
//         screenShare={screenShare}
//         toggleAudio={toggleAudio}
//         disconnectCall={disconnectCall}
//         isAudio={isAudio}
//       />
//       {isAdmin && meetingInfoPopUp && (
//         <MeetingInfo setMeetingInfoPopUp={setMeetingInfoPopUp} url={url} />
//       )}
//       {isMessenger ? <Messenger setIsMessenger={setIsMessenger} sendMsg={sendMsg} messageList={messageList}/> : messageAlert.isPopup && <Alert messageAlert={messageAlert}/>}
//     </div>
//   );
// };

// export default CallPage;

//GitHUB code

// import { useEffect, useReducer, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getRequest, postRequest } from "../utils/apiRequests";
// import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../utils/apiEndPoints";
// import io from "socket.io-client";
// import Peer from "simple-peer";
// import "./Styles/CallPage.scss";
// import Messenger from "../UI/Messenger";
// import MessageListReducer from "../reducer/MessageListReducer";
// import Alert from "../UI/Alert";
// import MeetingInfo from "../UI/MeetingInfo";
// import CallPageFooter from "../UI/CallPageFooter";
// import CallPageHeader from "../UI/CallPageHeader";

// const socket = io.connect("http://localhost:5000");
// const initialState = [];

// const CallPage = () => {
//   const peerRef = useRef(null);
//   const videoRef = useRef(null);
//   const navigate = useNavigate();
//   let { id } = useParams();
//   const isAdmin = window.location.hash == "#init" ? true : false;
//   const url = `${window.location.origin}${window.location.pathname}`;
//   let alertTimeout = null;

//   const [messageList, messageListReducer] = useReducer(
//     MessageListReducer,
//     initialState
//   );

//   const [streamObj, setStreamObj] = useState();
//   const [screenCastStream, setScreenCastStream] = useState();
//   const [meetInfoPopup, setMeetInfoPopup] = useState(false);
//   const [isPresenting, setIsPresenting] = useState(false);
//   const [isMessenger, setIsMessenger] = useState(false);
//   const [messageAlert, setMessageAlert] = useState({});
//   const [isAudio, setIsAudio] = useState(true);

//   useEffect(() => {
//     if (isAdmin) {
//       setMeetInfoPopup(true);
//     }
//     initWebRTC();
//     socket.on("code", (data) => {
//       if (data.url === url) {
//         peerRef.current.signal(data.code);
//       }
//     });

//     return () => {
//       const peer = peerRef.current;
//       if (peer) {
//         peer.destroy();
//       }
//     };
//   }, []);

//   const getRecieverCode = async () => {
//     const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
//     if (response?.code) {
//       peerRef.current.signal(response.code);
//     } else {
//       console.error("No signal code received");
//     }
//   };

//   const initWebRTC = () => {
//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       console.error("getUserMedia not supported.");
//       return;
//     }
//     navigator.mediaDevices
//       .getUserMedia({
//         video: true,
//         audio: true,
//       })
//       .then((stream) => {
//         setStreamObj(stream);

//         peerRef.current = new Peer({
//           trickle: false,
//           initiator: isAdmin,
//           stream: stream,
//         });

//         if (!isAdmin) {
//           getRecieverCode();
//         }

//         peerRef.current.on("signal", async (data) => {
//           if (isAdmin) {
//             let payload = {
//               id,
//               signalData: data,
//             };
//             await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
//           } else {
//             // eslint-disable-next-line no-unused-vars
//             socket.emit("code", { code: data, url }, (cbData) => {
//               console.log("code sent");
//             });
//           }
//         });

//         peerRef.current.on("connect", () => {
//           console.log("Connected");
//         });

//         peerRef.current.on("data", (data) => {
//           clearTimeout(alertTimeout);
//           messageListReducer({
//             type: "addMessage",
//             payload: {
//               user: "other",
//               msg: data.toString(),
//               time: Date.now(),
//             },
//           });

//           setMessageAlert({
//             alert: true,
//             isPopup: true,
//             payload: {
//               user: "other",
//               msg: data.toString(),
//             },
//           });

//           alertTimeout = setTimeout(() => {
//             setMessageAlert({
//               ...messageAlert,
//               isPopup: false,
//               payload: {},
//             });
//           }, 10000);
//         });

//         peerRef.current.on("stream", (stream) => {
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;
//             videoRef.current.play();
//           }
//         });
//       })
//       .catch(() => {});
//   };

//   const sendMsg = (msg) => {
//     if (peerRef.current && peerRef.current.connected) {
//       peerRef.current.on(JSON.stringify(msg));
//       messageListReducer({
//         type: "addMessage",
//         payload: {
//           user: "you",
//           msg: msg,
//           time: Date.now(),
//         },
//       });
//     } else {
//       console.error(
//         "Peer is not connected or initialized. Cannot send message."
//       );
//     }
//   };
//   const screenShare = () => {
//     navigator.mediaDevices
//       .getDisplayMedia({ cursor: true })
//       .then((screenStream) => {
//         peerRef.current.replaceTracks(
//           streamObj.getVideoTracks()[0],
//           screenStream.getVideoTracks()[0],
//           streamObj
//         );
//         setScreenCastStream(screenStream);
//         screenStream.getTracks()[0].onended = () => {
//           peerRef.current.replaceTracks(
//             screenStream.getVideoTracks()[0],
//             streamObj.getVideoTracks()[0],
//             streamObj
//           );
//         };
//         setIsPresenting(true);
//       });
//   };

//   const stopScreenShare = () => {
//     screenCastStream.getVideoTracks().forEach(function (track) {
//       track.stop();
//     });
//     peerRef.current.replaceTrack(
//       screenCastStream.getVideoTracks()[0],
//       streamObj.getVideoTracks()[0],
//       streamObj
//     );
//     setIsPresenting(false);
//   };

//   const toggleAudio = (value) => {
//     streamObj.getAudioTracks()[0].enabled = value;
//     setIsAudio(value);
//   };

//   const disconnectCall = () => {
//     peerRef.current.destroy();
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <div className="callpage-container">
//       <video ref={videoRef} className="video-container" controls></video>

//       <CallPageHeader
//         isMessenger={isMessenger}
//         setIsMessenger={setIsMessenger}
//         messageAlert={messageAlert}
//         setMessageAlert={setMessageAlert}
//       />
//       <CallPageFooter
//         isPresenting={isPresenting}
//         stopScreenShare={stopScreenShare}
//         screenShare={screenShare}
//         isAudio={isAudio}
//         toggleAudio={toggleAudio}
//         disconnectCall={disconnectCall}
//       />

//       {isAdmin && meetInfoPopup && (
//         <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
//       )}
//       {isMessenger ? (
//         <Messenger
//           setIsMessenger={setIsMessenger}
//           sendMsg={sendMsg}
//           messageList={messageList}
//         />
//       ) : (
//         messageAlert.isPopup && <Alert messageAlert={messageAlert} />
//       )}
//     </div>
//   );
// };
// export default CallPage;

//Chatgpt code

import { useEffect, useReducer, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import { getRequest, postRequest } from "../utils/apiRequests";
import { BASE_URL, GET_CALL_ID, SAVE_CALL_ID } from "../utils/apiEndPoints";
import "./Styles/CallPage.scss";
import Messenger from "../UI/Messenger";
import MessageListReducer from "../reducer/MessageListReducer";
import Alert from "../UI/Alert";
import MeetingInfo from "../UI/MeetingInfo";
import CallPageFooter from "../UI/CallPageFooter";
import CallPageHeader from "../UI/CallPageHeader";

const socket = io.connect("http://localhost:5000"); // Socket connection
const initialState = []; // Initial message state

const CallPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = window.location.hash === "#init";
  const url = `${window.location.origin}${window.location.pathname}`;
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  let alertTimeout = null;

  const [streamObj, setStreamObj] = useState(null);
  const [screenCastStream, setScreenCastStream] = useState(null);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isAudio, setIsAudio] = useState(true);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  useEffect(() => {
    if (isAdmin) setMeetInfoPopup(true);
    initWebRTC();
    socket.on("code", (data) => {
      if (data.url === url) peerRef.current.signal(data.code);
    });

    return () => {
      if (peerRef.current) peerRef.current.destroy();
      socket.disconnect();
    };
  }, []);

  const getReceiverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    console.log(response.code);
    if (response?.code) {
      peerRef.current.signal(response.code);
    } else console.error("No signal code received");
  };

  const initWebRTC = () => {
    navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
      console.log(permissionStatus.state); // 'granted', 'denied', 'prompt'
    });

    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionStatus) => {
        console.log(permissionStatus.state); // 'granted', 'denied', 'prompt'
      });

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        console.log(device.kind + ": " + device.label);
      });
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStreamObj(stream);
        peerRef.current = new Peer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });

        peerRef.current.on("signal", async (data) => {
          if (isAdmin) {
            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, {
              id,
              signalData: data,
            });
          } else {
            socket.emit("code", { code: data, url });
          }
        });

        peerRef.current.on("connect", () => console.log("Peer connected"));

        peerRef.current.on("data", (data) => {
          handleMessage(data.toString(), "other");
        });

        peerRef.current.on("stream", (remoteStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
            videoRef.current.play();
          }
        });

        peerRef.current.on("error", (err) =>
          console.error("Peer connection error:", err)
        );

        if (!isAdmin) getReceiverCode();
      })
      .catch((error) => {
        if (error.name === "NotAllowedError") {
          console.error("Permission denied to access media devices.");
        } else if (error.name === "NotFoundError") {
          console.error("No camera or microphone found.");
        } else if (error.name === "OverconstrainedError") {
          console.error(
            "Constraints cannot be satisfied by available devices."
          );
        } else {
          console.error("Error accessing media devices:", error.message);
        }
      });
  };

  const handleMessage = (message, user) => {
    clearTimeout(alertTimeout);
    messageListReducer({
      type: "addMessage",
      payload: { user, msg: message, time: Date.now() },
    });

    setMessageAlert({
      alert: true,
      isPopup: true,
      payload: { user, msg: message },
    });

    alertTimeout = setTimeout(() => {
      setMessageAlert({ ...messageAlert, isPopup: false, payload: {} });
    }, 10000);
  };

  const sendMsg = (msg) => {
    if (peerRef.current && peerRef.current.connected) {
      peerRef.current.send(msg);
      handleMessage(msg, "you");
    } else {
      console.error("Peer is not connected.");
    }
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peerRef.current.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        setIsPresenting(true);
        screenStream.getTracks()[0].onended = stopScreenShare;
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getTracks().forEach((track) => track.stop());
    peerRef.current.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const disconnectCall = () => {
    if (peerRef.current) peerRef.current.destroy();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="callpage-container">
      <video
        ref={videoRef}
        className="video-container"
        controls
        autoPlay
      ></video>

      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />

      <CallPageFooter
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
      />

      {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}

      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};

export default CallPage;
