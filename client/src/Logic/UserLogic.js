import { alphabetColors } from "../Constants";

const UserLogic = () => {
  const GetIframeColor = (Alphabet = "") => {
    let color = "";
    alphabetColors.forEach((ele) => {
      if (Alphabet.toLocaleLowerCase() === ele.start.toLocaleLowerCase()) {
        color = ele.color;
      }
    });
    return color;
  };

  const GetUserIcon = (name) => {
    let username = name
      .trim()
      .split(" ")
      .reduce((curr, acc) => {
        acc = curr[0] + acc[0];
        return acc;
      });

    return username;
  };

  return { GetIframeColor, GetUserIcon };
};

export default UserLogic;
