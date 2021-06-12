let defaultTime = new Date(2021, 12, null);

class ChangeData {
  constructor({
    changeTitleParagraph,
    changeDayInDate,
    changeMonthInDate,
    changeYearInDate,
    changeHeaderImage,
    currentAppTitle,
    submitChangeBtn,
    currentHeaderImage,
  }) {
    this.paragraphTitle = changeTitleParagraph;
    this.changeDayInDate = changeDayInDate;
    this.changeMonthInDate = changeMonthInDate;
    this.changeYearInDate = changeYearInDate;
    this.changeHeaderImage = changeHeaderImage;
    this.currentAppTitle = currentAppTitle;
    this.submitChangeBtn = submitChangeBtn;
    this.currentHeaderImage = currentHeaderImage;
    this.submitChangeBtn.addEventListener(
      "click",
      this.handleChangeData.bind(this)
    );
    this.handleFixWindowHeight();
  }
  handleFixWindowHeight = () => {
    document.documentElement.style.setProperty(
      "--fixedWindowHeight",
      `${window.innerHeight}px`
    );
  };
  handleChangeImage() {
    const newImageSource = this.changeHeaderImage.value;
    if (newImageSource.includes("http") || newImageSource.includes("https")) {
      this.currentHeaderImage.src = newImageSource;
      return true;
    }
    return false;
  }
  handleChangeFutureTime() {
    const inputedNewDate = new Date(
      +this.changeYearInDate.value,
      +this.changeMonthInDate.value - 1,
      +this.changeDayInDate.value
    );

    if (
      this.changeYearInDate.value &&
      this.changeMonthInDate.value &&
      this.changeDayInDate.value &&
      inputedNewDate.getTime() > defaultTime.getTime()
    ) {
      defaultTime = inputedNewDate;

      return true;
    }
    return false;
  }
  handleChangeTitle() {
    if (this.paragraphTitle.value.length >= 5) {
      const text = this.paragraphTitle.value;
      this.currentAppTitle.textContent = text;
      return true;
    }
    return false;
  }
  handleChangeData() {
    const isTitleChanged = this.handleChangeTitle();
    const isTimeChanged = this.handleChangeFutureTime();
    const isImgChanged = this.handleChangeImage();
    const paragraphMessage = document.createElement("p");

    paragraphMessage.classList.add("invalid-input");
    if (!(isTitleChanged && isTimeChanged && isImgChanged)) {
      paragraphMessage.textContent = "All vields need to be filled correctly !";
      paragraphMessage.classList.add("error-message");
      document.body.appendChild(paragraphMessage);
      setTimeout(() => {
        paragraphMessage.remove();
      }, 3000);
    }

    this.paragraphTitle.value = "";
    this.changeDayInDate.value = "";
    this.changeMonthInDate.value = "";
    this.changeYearInDate.value = "";
    this.changeHeaderImage.value = "";
  }
}

class CalculateValues {
  constructor({ pDays, pHours, pMinutes, pSeconds }) {
    this.days = pDays;
    this.hours = pHours;
    this.minutes = pMinutes;
    this.seconds = pSeconds;
    this.intervalId = setInterval(this.handleShowInfo, 1000);
  }
  calculateDays(total) {
    const daysRemaining = Math.floor(total / (1000 * 60 * 60 * 24));
    return daysRemaining;
  }
  calculateHours(total) {
    let hoursRemaining = Math.floor(
      (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (hoursRemaining < 10) {
      hoursRemaining = "0" + hoursRemaining;
    }
    return hoursRemaining;
  }
  calculateMinutes(total) {
    let minutesRemaining = Math.floor(
      ((total % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)
    );
    if (minutesRemaining < 10) {
      minutesRemaining = `0${minutesRemaining}`;
    }
    return minutesRemaining;
  }
  calculateSeconds(total) {
    let secondsRemaining = Math.floor(
      (((total % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) /
        1000
    );
    if (secondsRemaining < 10) {
      secondsRemaining = `0${secondsRemaining}`;
    }
    return secondsRemaining;
  }
  handleCalculateCurrentTime() {
    const currentDate = Date.now();
    return currentDate;
  }

  handleShowInfo = () => {
    const currentTime = this.handleCalculateCurrentTime();
    const total = defaultTime.getTime() - currentTime;
    this.days.textContent = this.calculateDays(total);
    this.hours.textContent = this.calculateHours(total);
    this.minutes.textContent = this.calculateMinutes(total);
    this.seconds.textContent = this.calculateSeconds(total);
    new ChangeData({
      changeTitleParagraph: document.getElementById("date-name"),
      changeDayInDate: document.getElementById("day-type"),
      changeMonthInDate: document.getElementById("month-type"),
      changeYearInDate: document.getElementById("year-type"),
      changeHeaderImage: document.getElementById("date-image"),
      currentAppTitle: document.getElementById("app-title"),
      submitChangeBtn: document.getElementById("submit-change"),
      currentHeaderImage: document.getElementById("main-image"),
    });
  };
}

class RightTimingApp {
  constructor({ toolsBtn, toolsTab, values }) {
    this.toolsBtn = toolsBtn;
    this.toolsTab = toolsTab;
    this.timeData = values;
    this.newDate = new CalculateValues(this.timeData);
    this.toolsBtn.addEventListener("click", this.handleToolsTab.bind(this));
  }
  handleAddClasses(firstClass, secondClass, target) {
    this.toolsTab.classList.toggle(firstClass);
    target.classList.toggle(secondClass);
    const modal = document.querySelector(".cover-modal");
    modal.classList.add("active");
    [modal].forEach((itm) => {
      itm.addEventListener("click", (e) => {
        this.toolsTab.classList.remove(firstClass);
        e.currentTarget.classList.remove("active");
      });
    });
  }
  handleToolsTab(ev) {
    this.handleAddClasses("active", "btn-active", ev.currentTarget);
  }
}

const calculateTime = new RightTimingApp({
  toolsBtn: document.getElementById("tools"),
  toolsTab: document.getElementById("tools-tab"),
  values: {
    pDays: document.querySelector(".days p"),
    pHours: document.querySelector(".hours p"),
    pMinutes: document.querySelector(".minutes p"),
    pSeconds: document.querySelector(".seconds p"),
  },
});
