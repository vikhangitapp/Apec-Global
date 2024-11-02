const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  const day = daysOfWeek[date.getUTCDay()];
  const dateNum = date.getUTCDate();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}, ${dateNum}.${month}.${year}`;
};
const calculateDuration = (checkin_time, checkout_time) => {
  // Hàm kiểm tra và chuyển đổi thời gian "hh:mm:ss" thành giây
  const timeToSeconds = (time) => {
    if (typeof time !== "string" || !time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      throw new Error("Thời gian phải là chuỗi định dạng 'hh:mm:ss'");
    }
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  try {
    // Chuyển đổi thời gian thành giây
    let checkinSeconds = timeToSeconds(checkin_time);
    let checkoutSeconds = timeToSeconds(checkout_time);

    // Thời gian giới hạn
    const startLimit = timeToSeconds("08:00:00");
    const endLimit = timeToSeconds("17:00:00");

    // Kiểm tra điều kiện đặc biệt
    if (checkinSeconds < startLimit && checkoutSeconds > endLimit) {
      return "8 tiếng"; // Trả về 8 tiếng nếu thỏa điều kiện
    }

    // Nếu checkin_time sau 08:00:00
    if (checkinSeconds >= startLimit) {
      // Nếu checkout_time là 18:00:00 hoặc sau 17:00:00
      if (checkoutSeconds > endLimit) {
        checkoutSeconds = endLimit; // Gán checkout_time về 17:00:00
      }
    }

    // Tính toán khoảng thời gian
    const durationSeconds = checkoutSeconds - checkinSeconds;

    if (durationSeconds < 0) {
      return "Thời gian không hợp lệ"; // Kiểm tra nếu thời gian checkout trước checkin
    }

    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);

    // Định dạng lại kết quả với 2 chữ số
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  } catch (error) {
    return error.message; // Trả về thông báo lỗi nếu có
  }
};

const getDayName = () => {
  const days = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const dayIndex = new Date().getDay();
  return days[dayIndex];
};
const getCurrentTimeFormatted = () => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0"); // Định dạng giờ
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Định dạng phút
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Định dạng giây

  return `${hours} giờ ${minutes} phút ${seconds} giây`;
};
const getCurrentTimeCheckInCheckOut = () => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0"); // Định dạng giờ
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Định dạng phút
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Định dạng giây

  return `${hours}:${minutes}:${seconds}`;
};
const getCalendarByUser = (timestamp) => {
  const date = new Date(timestamp);

  // Lấy các thành phần ngày tháng
  const day = date.getUTCDate(); // Ngày
  return day;
};
const getMonthByUser = (timestamp) => {
  const date = new Date(timestamp);

  // Lấy các thành phần ngày tháng
  const day = date.getUTCMonth(); // Ngày
  return day;
};
const getYearhByUser = (timestamp) => {
  const date = new Date(timestamp);

  // Lấy các thành phần ngày tháng
  const day = date.getUTCFullYear(); // Ngày
  return day;
};

function convertTimeFormat(timeString) {
  // Tách chuỗi bằng dấu hai chấm
  const timeParts = timeString.split(":");

  // Lấy phần giờ và phút, sau đó ghép lại
  const result = timeParts.slice(0, 2).join(":");

  return result;
}
function convertTimeString(timeString) {
  // Sử dụng biểu thức chính quy để tách giờ, phút, giây
  const regex = /(\d+)\s*giờ\s*(\d+)\s*phút\s*(\d+)\s*giây/;
  const match = timeString.match(regex);

  if (match) {
    const hours = match[1]; // Lấy số giờ
    const minutes = match[2]; // Lấy số phút

    // Định dạng lại kết quả
    return `${hours}:${minutes}`;
  } else {
    return "--:--"; // Nếu chuỗi không đúng định dạng
  }
}
function convertTimeStringHistory(timeString) {
  // Sử dụng biểu thức chính quy để tách giờ, phút, giây
  const regex = /(\d+)\s*giờ\s*(\d+)\s*phút\s*(\d+)\s*giây/;
  const match = timeString.match(regex);

  if (match) {
    const hours = match[1]; // Lấy số giờ
    const minutes = match[2]; // Lấy số phút

    // Định dạng lại kết quả
    return `${hours}:${minutes}`;
  } else {
    return "--:--"; // Nếu chuỗi không đúng định dạng
  }
}
function timeStringToSeconds(timeString) {
  const parts = timeString.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);
  return hours * 3600 + minutes * 60 + seconds;
}

function secondsToTimeString(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function subtractTime(time1, time2) {
  const seconds1 = timeStringToSeconds(time1);
  const seconds2 = timeStringToSeconds(time2);

  // Tính toán hiệu
  let diffSeconds = seconds1 - seconds2;

  // Đảm bảo giá trị không âm
  if (diffSeconds < 0) {
    return "Kết quả không hợp lệ"; // Hoặc xử lý theo cách khác nếu cần
  }

  // Chuyển đổi lại thành chuỗi "hh:mm:ss"
  return secondsToTimeString(diffSeconds);
}
const calculateDurationHistory = (checkin_time, checkout_time) => {
  // Hàm chuyển đổi thời gian "hh:mm:ss" thành giây
  const timeToSeconds = (time) => {
    if (typeof time !== "string" || !time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      throw new Error("");
    }
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  try {
    // Chuyển đổi thời gian thành giây
    let checkinSeconds = timeToSeconds(checkin_time);
    let checkoutSeconds = timeToSeconds(checkout_time);

    // Thời gian giới hạn
    const startLimit = timeToSeconds("08:00:00");
    const endLimit = timeToSeconds("17:00:00");

    // Kiểm tra điều kiện đặc biệt
    if (checkinSeconds < startLimit && checkoutSeconds > endLimit) {
      return "8 tiếng"; // Trả về 8 tiếng nếu thỏa điều kiện
    }

    // Nếu checkin_time sau 08:00:00
    if (checkinSeconds >= startLimit) {
      // Nếu checkout_time là 18:00:00 hoặc sau 17:00:00
      if (checkoutSeconds > endLimit) {
        checkoutSeconds = endLimit; // Gán checkout_time về 17:00:00
      }
    }

    // Tính toán khoảng thời gian
    const durationSeconds = checkoutSeconds - checkinSeconds;

    if (durationSeconds < 0) {
      return "Thời gian không hợp lệ"; // Kiểm tra nếu thời gian checkout trước checkin
    }

    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);

    // Định dạng lại kết quả với 2 chữ số
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  } catch (error) {
    return error.message; // Trả về thông báo lỗi nếu có
  }
};
const addHoursToTimeString = (timeString, hoursToAdd) => {
  // Tách các thành phần giờ, phút, giây
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Cộng thêm giờ
  const totalHours = hours + hoursToAdd;

  // Tính giá trị giờ mới (0-23)
  const newHours = totalHours % 24;
  const newMinutes = minutes % 60; // Giá trị phút không thay đổi trong trường hợp này
  const newSeconds = seconds % 60; // Giá trị giây không thay đổi trong trường hợp này

  // Định dạng lại kết quả
  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
    2,
    "0"
  )}:${String(newSeconds).padStart(2, "0")}`;
};
const isCurrentTimeAfterOneHour = (timeString) => {
  // Lấy thời gian hiện tại
  const now = new Date();

  // Tách chuỗi thời gian thành giờ, phút, giây
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Tạo đối tượng Date từ thời gian đã cho
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds
  );

  // Cộng thêm 1 giờ vào thời gian mục tiêu
  targetTime.setHours(targetTime.getHours() + 1);

  // So sánh thời gian hiện tại với thời gian đã điều chỉnh
  return now > targetTime;
};
const formatDateStringBirth = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  const day = daysOfWeek[date.getUTCDay()];
  const dateNum = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${dateNum}/${month}/${year}`;
};
export {
  formatDateString,
  calculateDuration,
  getDayName,
  getCurrentTimeFormatted,
  getCurrentTimeCheckInCheckOut,
  getCalendarByUser,
  getMonthByUser,
  getYearhByUser,
  convertTimeFormat,
  convertTimeString,
  convertTimeStringHistory,
  subtractTime,
  calculateDurationHistory,
  addHoursToTimeString,
  isCurrentTimeAfterOneHour,
  formatDateStringBirth,
};
