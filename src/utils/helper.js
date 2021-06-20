export function formatQuestion (question, author) {
    const { id, timestamp } = question
    const { name, avatarURL } = author
  
    return {
        id,
        name,
        avatarURL,
        timestamp,
        optionOne: question.optionOne.text,
        optionTwo: question.optionTwo.text
    }
  }

  export function formatLeaderBoard (users) {  
    let formatedUser = [];
    Object.values(users).forEach(user => {
        user['answeredScore'] = Object.keys(user.answers).length;
        user['questionScore'] = user.questions.length;
        user['score'] = user['answeredScore'] + user['questionScore']
        formatedUser.push(user);
    });
    return formatedUser;
  }