export function validateQuestData(quest) {
  if (!quest.title || quest.title.trim().length === 0) {
    return {
      valid: false,
      error: "Quest title cannot be empty.",
    };
  }

  if (typeof quest.estTime !== "number" || quest.estTime <= 0) {
	  return {
		  valid: false, 
		  error: "Estimated time must be greater than zero", 
	  }; 
  }

  return {
    valid: true,
  };
}
