function requiredParams(res, msg = "", status, data = {}, success = false) {
  const code = status == undefined ? 200 : status;
  res.status(code).send({
    success: success,
    msg: msg,
    data: data,
  });
  return 0;
}

export default requiredParams;
