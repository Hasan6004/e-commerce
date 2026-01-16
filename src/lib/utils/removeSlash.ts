const removeSlash = function (date: any) {
  date = date?.replaceAll("/", "-");
  return date;
};

export default removeSlash;
