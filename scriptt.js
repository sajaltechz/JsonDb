$("#rollNo").focus();
function validateAndGetFormData() {
var rollNoVar = $("#rollNo").val();
if (rollNoVar === "") {
alert("Roll No Required Value");
$("#rollNo").focus();
return "";
}
var fullNameVar = $("#fullName").val();
if (fullNameVar === "") {
alert("Full Name is Required Value");
$("#fullName").focus();
return "";
}
var classVar = $("#class").val();
if (classVar === "") {
alert("Class is Required Value");
$("#class").focus();
return "";
}
var birthDateVar = $("#birthDate").val();
if (birthDateVar === "") {
alert("Birth Date is Required Value");
$("#birthDate").focus();
return "";
}
var addressVar = $("#address").val();
if (addressVar === "") {
alert("Address is Required Value");
$("#address").focus();
return "";
}
var enrollmentDateVar = $("#enrollmentDate").val();
if (enrollmentDateVar === "") {
alert("Enrollment Date is Required Value");
$("#enrollmentDate").focus();
return "";
}
var jsonStrObj = {
rollNo: rollNoVar,
fullName: fullNameVar,
class: classVar,
birthDate : birthDateVar,
address : addressVar,
enrollmentDate : enrollmentDateVar,

};
return JSON.stringify(jsonStrObj);
}
// This method is used to create PUT Json request.
function createPUTRequest(connToken, jsonObj, dbName, relName) {
var putRequest = "{\n"
+ "\"token\" : \""
+ connToken
+ "\","
+ "\"dbName\": \""
+ dbName
+ "\",\n" + "\"cmd\" : \"PUT\",\n"
+ "\"rel\" : \""
+ relName + "\","
+ "\"jsonStr\": \n"
+ jsonObj
+ "\n"
+ "}";
return putRequest;
}
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
var url = dbBaseUrl + apiEndPointUrl;
var jsonObj;
$.post(url, reqString, function (result) {
jsonObj = JSON.parse(result);
}).fail(function (result) {
var dataJsonObj = result.responseText;
jsonObj = JSON.parse(dataJsonObj);
});
return jsonObj;
}
function resetForm() {
$("#rollNo").val("")
$("#fullName").val("");
$("#class").val("");
$("#birthDate").val("");
$("#address").val("");
$("#enrollmentDate").val("");

$("#rollNo").focus();
}
function saveData() {
var jsonStr = validateAndGetFormData();
if (jsonStr === "") {
return;
}
var putReqStr = createPUTRequest("90931515|-31949302596758926|90960255",
jsonStr, "Student", "Student-rel");
alert(putReqStr);
jQuery.ajaxSetup({async: false});
var resultObj = executeCommand(putReqStr,
"http://api.login2explore.com:5577","/api/iml");
alert(JSON.stringify(resultObj));
jQuery.ajaxSetup({async: true});
resetForm();
}