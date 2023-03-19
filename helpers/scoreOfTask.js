// function to compute score of a sentence out of hundred based on the following parameters: Response time for each word, Number of clicks on the hint button, Number of time audio help taken, Number of wrong input while reading, Number of wrong input while writing

const scoreOfSentence = (time, clicks, audio, wrongRead, wrongWrite) => {
  let score = 0;
  if (time <= 3) {
    score += 80;
  } else if (time <= 4) {
    score += 70;
  } else if (time <= 5) {
    score += 60;
  } else if (time <= 6) {
    score += 50;
  } else if (time <= 7) {
    score += 40;
  } else if (time <= 8) {
    score += 30;
  } else if (time <= 9) {
    score += 20;
  } else if (time <= 10) {
    score += 10;
  } else {
    score += 0;
  }
  score -= clicks * 5;
  score -= audio * 5;
  score -= wrongRead * 5;
  score -= wrongWrite * 5;
  if (score < 0) {
    score = 0;
  }
  return score;
};

const scoreOfTask = (sentences) => {
  let score = 0;
  sentences.forEach((sentence) => {
    let totalResponseTime = sumOfArray(sentence.responseTimeForEachWord);
    score += scoreOfSentence(
      totalResponseTime,
      sentence.numberOfHintsUsed,
      sentence.numberOfErrorsWhileReading,
      sentence.numberOfErrorsWhileWriting,
      sentence.numberofAudioReplays
    );
  });
  return score / sentences.length;
};

const sumOfArray = (array) => {
  let sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  return sum;
};

module.exports = {
  scoreOfSentence, scoreOfTask , sumOfArray
}