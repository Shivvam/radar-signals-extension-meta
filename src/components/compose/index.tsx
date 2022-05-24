import React from "react";
import styled from "styled-components";
import channelSelectedIcon from "../../assets/images/channelSelectedIcon.svg";

interface PropTypes {
  nextStage: () => void;
  selectedChannel: any;
  jumpStage: (_stageName: string) => void;
}

export const Compose = ({
  nextStage,
  selectedChannel,
  jumpStage,
}: PropTypes) => {
  const [signalComment, setsignalComment] = React.useState("");


  return (
    <>
      <Wrapper>
        <h2 className="head">Why is this signal interesting?</h2>
        <textarea
          className="text-area"
          placeholder="Write a comment..."
          onChange={(e) => setsignalComment(e.target.value)}
        />
        <div style={{ display: selectedChannel?.label ? "none" : "block" }}>
          <button
            type="button"
            onClick={nextStage}
            className="button btn-select"
          >
            Select Channel ↓
          </button>
        </div>

        <div
          className="box box-selected"
          style={{ display: selectedChannel?.label ? "block" : "none" }}
        >
          <p className="channel-selected-msg">
            Channel selected
            <img
              src={channelSelectedIcon}
              alt="Done"
              style={{
                width: "16px",
              }}
            />
          </p>
          <p className="selected-channel-value">{selectedChannel?.label}</p>
        </div>

        <button
          className="button btn-send"
          type="button"
          disabled={!selectedChannel?.label || !signalComment}
          onClick={() => {
            jumpStage("success");
          }}
        >
          SEND
        </button>
      </Wrapper>
    </>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div`
  .box-selected {
    height: 68px !important;
  }
  .selected-channel-value {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #000;
    text-align: center;
    margin: 2px auto;
  }
  .channel-selected-msg {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;
    margin: 2px auto;
  }
  .btn-select {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;
  }
  .head {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
  }
  .text-area {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    padding: 12px 0px 0px 14px;
    width: 269px;
    height: 128px;
    background: #ffffff;
    border: 0.903246px solid #000000;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    resize: none;
    &:active {
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }
  .box {
    background: #fff;
    padding: 7.15px;
    border: 0.903246px solid #000000;
    width: 269px;
    height: 100px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    resize: none;
    margin: 18px 5px 0px 5px;
    display: "flex";
    flex-direction: "column";
  }
`;
