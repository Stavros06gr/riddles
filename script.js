fetch('riddles.json')
  .then(response => response.json())
  .then(data => {
    const dayIndex = getDayOfYear() % data.length;
    console.log("Today day of the year: ", getDayOfYear());
    console.log("Total number of objects:", data.length);
    console.log("dayIndex: ", dayIndex);
    console.log("Today's data object:", data[dayIndex]);

    let language = 'en';

    const questionElement = document.getElementById("daily-text");
    const errorElement = document.getElementById("error-message");
    const toggleAnswerBtn = document.getElementById("toggle-answer-btn");
    const languageToggleBtn = document.getElementById("language-toggle");

    const updateContent = () => {
      try {
        if (!data || !data[dayIndex]) {
          throw new Error("Data or today's entry is missing");
        }

        const question = language === 'en' ? data[dayIndex].riddle : data[dayIndex].riddle_gr;
        if (!question) throw new Error("Riddle text is missing");

        questionElement.innerHTML = `<strong>${question.replace(/\n/g, '<br>')}</strong><br><span id="answer" style="display:none;"></span>`;
        toggleAnswerBtn.textContent = "Show Answer";
        toggleAnswerBtn.style.display = 'inline-block';
        errorElement.textContent = "";
      } catch (error) {
        console.error("Update content error:", error);
        errorElement.textContent = "Error loading daily text.";
      }
    };

    toggleAnswerBtn.addEventListener('click', () => {
      try {
        const answerElement = document.getElementById("answer");
        if (answerElement.style.display === 'none') {
          const answer = language === 'en' ? data[dayIndex].answer : data[dayIndex].answer_gr;
          if (!answer) throw new Error("Answer text is missing");

          answerElement.textContent = answer;
          answerElement.style.display = 'inline';
          toggleAnswerBtn.textContent = "Hide Answer";
        } else {
          answerElement.style.display = 'none';
          toggleAnswerBtn.textContent = "Show Answer";
        }
      } catch (error) {
        console.error("Toggle answer error:", error);
        errorElement.textContent = "Error loading answer.";
      }
    });

    languageToggleBtn.addEventListener('click', () => {
      language = (language === 'en') ? 'gr' : 'en';
      updateContent();
    });

    updateContent();
  })
  .catch(error => {
    console.error('Failed to load texts:', error);
    document.getElementById("daily-text").textContent = "Error loading daily text.";
  });

// Get the current day of the year
function getDayOfYear() {
 const date = new Date();
 const start = new Date(date.getFullYear(), 0, 0);
 const diff = date - start;
 const oneDay = 1000 * 60 * 60 * 24;
 const dayOfYear = Math.floor(diff / oneDay);
 return dayOfYear;
}
