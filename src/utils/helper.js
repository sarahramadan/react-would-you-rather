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