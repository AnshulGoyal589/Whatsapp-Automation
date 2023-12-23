const main = document.querySelector("#app");
const extension = document.createElement("div");
main.style.width = '1150px';
extension.style.width = '380px';
extension.style.height = '700px';
extension.style.backgroundColor = 'white';
extension.style.marginLeft = '1140px';
extension.style.position = 'absolute';
extension.style.zIndex = '99999';
extension.style.padding = '20px';
extension.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

let y;

const form = document.createElement('form');

// Create an input field for the form
const inputField = document.createElement('input');
inputField.type = 'text';
inputField.placeholder = 'Enter your message';
form.appendChild(inputField);

// Create a submit button
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Submit';
form.appendChild(submitButton);

// Add an event listener to handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    y=inputField.value;
// Content script
alert(inputField.value);
    // fetch("http://localhost:3080/submit", {
      fetch("https://whatsapp-automation-chrome-extension-4jal.vercel.app/submit", {

  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message: inputField.value })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

});

var radioInput = document.createElement('input');
radioInput.type = 'radio';
radioInput.name = 'privacyOption'; 
radioInput.value = 'private';
radioInput.checked = true;
radioInput.id = 'privateOption';
radioInput.style.color = 'black';
radioInput.style.marginBottom = '20px';
var privateLabel = document.createElement('label');
privateLabel.htmlFor = 'privateOption';
privateLabel.textContent = 'Private';
privateLabel.style.color = 'black';

var groupRadioInput = document.createElement('input');
groupRadioInput.type = 'radio';
groupRadioInput.name = 'privacyOption'; 
groupRadioInput.value = 'group';
groupRadioInput.id = 'groupOption';
var groupLabel = document.createElement('label');
groupLabel.htmlFor = 'groupOption';
groupLabel.textContent = 'Group';
groupLabel.style.color = 'black';

const divForRadio = document.createElement('div');


// label template
const labelTemplate = document.createElement("label");
labelTemplate.textContent = "Templates Type:";
labelTemplate.style.fontSize = "16px";
labelTemplate.style.fontWeight = "bold";
labelTemplate.style.marginBottom = "8px";
labelTemplate.style.marginRight = "15px";
labelTemplate.style.display = "inline-block";
labelTemplate.style.color = "black";


// options and select elements
var dropdown = document.createElement('select');
var options = ['message', 'file', 'message + file', 'document', 'message + document'];
options.forEach(function (optionText) {
  var option = document.createElement('option');
  option.value = optionText.toLowerCase().replace(/\s+/g, '-');
  option.text = optionText;
  dropdown.appendChild(option);
});
dropdown.style.padding = '10px';
dropdown.style.fontSize = '16px';
dropdown.style.color = 'black';
dropdown.style.backgroundColor = 'white';
dropdown.style.border = '1px solid #ccc';
dropdown.style.borderRadius = '20px';
dropdown.style.appearance = 'none'; 
dropdown.style.width = 'fit-content'; 
dropdown.style.textAlign = 'center'; 
dropdown.style.marginBottom = '20px'; 
dropdown.addEventListener('mouseenter', function () {
  dropdown.style.border = '1px solid #333';
}); 
dropdown.addEventListener('mouseleave', function () {
  dropdown.style.border = '1px solid #ccc';
});
dropdown.addEventListener('focus', function () {
  dropdown.style.border = '1px solid #333';
});
dropdown.addEventListener('blur', function () {
  dropdown.style.border = '1px solid #ccc';
});


// Main Form
const fileUploadForm = document.createElement("form");
fileUploadForm.style.marginTop = '20px';
fileUploadForm.style.border= '1px solid lightgrey';
fileUploadForm.style.backgroundColor= '#E6E6FA';
fileUploadForm.style.padding= '20px';
fileUploadForm.style.borderRadius= '5px';
fileUploadForm.style.width= '85%';


// Lablel for Text Message Input
const label = document.createElement("label");
label.textContent = "Text Message:";
label.style.fontSize = "16px";
label.style.fontWeight = "bold";
label.style.marginBottom = "8px";
label.style.display = "block";
label.style.color = "black";


// Text Message Input
const textMessageInput = document.createElement("textarea");
textMessageInput.placeholder = "Type your text message here";
textMessageInput.style.width = "100%";
textMessageInput.style.height = "100px";
textMessageInput.style.padding = "8px";
textMessageInput.style.boxSizing = "border-box";
textMessageInput.style.border = "1px solid #ccc";
textMessageInput.style.borderRadius = "5px";
textMessageInput.style.fontSize = "16px";
textMessageInput.style.marginBottom = "10px";
textMessageInput.style.resize = "vertical";
textMessageInput.addEventListener("focus", () => {
    textMessageInput.style.outline = "none";
    textMessageInput.style.borderColor = "#007bff";
    textMessageInput.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
});
textMessageInput.addEventListener("blur", () => {
    textMessageInput.style.outline = "";
    textMessageInput.style.borderColor = "";
    textMessageInput.style.boxShadow = "";
});


// Div for Label Text Message and Text Message
const containerDiv = document.createElement("div");
containerDiv.style.marginBottom = "5px";
containerDiv.appendChild(label);
containerDiv.appendChild(textMessageInput);


// Label For File Input
const fileLabel = document.createElement("label");
fileLabel.textContent = "Select File:";
fileLabel.style.fontSize = "16px";
fileLabel.style.fontWeight = "bold";
fileLabel.style.marginBottom = "5px";
fileLabel.style.display = "none";
fileLabel.style.color = "black";


// File Input
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.name = "image";
fileInput.style.marginBottom = '20px';
fileInput.style.color = 'black';
fileInput.style.display = 'none';

// const pdfInput = document.createElement("input");
// pdfInput.type = "file";
// pdfInput.name = "pdf";
// pdfInput.id = "pdfInput";
// pdfInput.accept = ".pdf";
// pdfInput.style.marginBottom = "20px";
// pdfInput.style.color = "black";


// Phone Number Input
const phoneNumberInput = document.createElement("input");
phoneNumberInput.type = "text";
phoneNumberInput.placeholder = "Enter multiple phone numbers (comma-separated)";
phoneNumberInput.style.width = "100%";
phoneNumberInput.style.color= "black";
phoneNumberInput.style.marginBottom = "20px";
phoneNumberInput.style.padding = "8px";


// Name Input
const phoneNumberInputString = document.createElement("input");
phoneNumberInputString.type = "text";
phoneNumberInputString.placeholder = "Enter multiple phone numbers (comma-separated)";
phoneNumberInputString.style.width = "100%";
phoneNumberInputString.style.color= "black";
phoneNumberInputString.style.padding = "8px";


// Group Name Input
const groupNameInput = document.createElement("input");
groupNameInput.type = "text";
groupNameInput.placeholder = "Enter multiple group names (comma-separated)";
groupNameInput.style.width = "100%";
groupNameInput.style.color= "black";
groupNameInput.style.marginBottom = "20px";
groupNameInput.style.display= "none";
groupNameInput.style.padding = "8px";


// Slider Label
const sliderLabel = document.createElement("label");
sliderLabel.textContent = "Select Time Delay between 5-60 seconds:";
sliderLabel.style.fontSize = "16px";
sliderLabel.style.fontWeight = "bold";
sliderLabel.style.marginBottom = "15px";
sliderLabel.style.color = "black";

// Slider Input
const sliderInput = document.createElement("input");
sliderInput.type = "range";
sliderInput.min = "5";
sliderInput.max = "60";
sliderInput.value = "5"; // Set a default value
sliderInput.style.width = "100%";
sliderInput.style.color = "black";
sliderInput.style.marginBottom = "10px";

// Display the selected value
const sliderValueDisplay = document.createElement("p");
sliderValueDisplay.textContent = `Selected Value: ${sliderInput.value}`;
sliderValueDisplay.style.color = "black";

// Update the display when the slider value changes
sliderInput.addEventListener("input", () => {
    sliderValueDisplay.textContent = `Selected Value: ${sliderInput.value}`;
});


// Form Button Send
const fileUploadButton = document.createElement("button");
fileUploadButton.style.padding = '8px';
fileUploadButton.style.borderRadius = '20px';
fileUploadButton.style.backgroundColor = '#800080';
fileUploadButton.style.color = 'white';
fileUploadButton.style.border = 'none';
fileUploadButton.style.marginTop = '20px';
fileUploadButton.textContent = "SEND DATA";


// Appending elemtns to Form
fileUploadForm.appendChild(privateLabel);
fileUploadForm.appendChild(radioInput);
fileUploadForm.appendChild(groupLabel);
fileUploadForm.appendChild(groupRadioInput);
fileUploadForm.appendChild(divForRadio);
fileUploadForm.appendChild(labelTemplate);
fileUploadForm.appendChild(dropdown);
fileUploadForm.appendChild(containerDiv);
fileUploadForm.appendChild(fileLabel);
fileUploadForm.appendChild(fileInput);

// fileUploadForm.appendChild(pdfInput);
fileUploadForm.appendChild(phoneNumberInput);
// fileUploadForm.appendChild(input);
fileUploadForm.appendChild(groupNameInput);
// fileUploadForm.appendChild(phoneNumberInputString);
fileUploadForm.appendChild(sliderLabel);
fileUploadForm.appendChild(sliderInput);
fileUploadForm.appendChild(sliderValueDisplay);
fileUploadForm.appendChild(fileUploadButton);




fileUploadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    // const pdfFile = pdfInput.files[0];
    const phoneNumbers = phoneNumberInput.value.split(',').map(number => number.trim());
    const groupNames = groupNameInput.value.split(',').map(number => number.trim());

    // const phoneNumbers = phoneNumberInputString.value.split(',').map(number => number.trim());
    
    const formData = new FormData();
    formData.append('message', textMessageInput.value);
    formData.append('id', y );

    
    phoneNumbers.forEach((phoneNumber, index) => {
        formData.append(`phoneNumbers[${index}]`, phoneNumber);
    });
    groupNames.forEach((groupName, index) => {
        formData.append(`groupNames[${index}]`,groupName);
    });

    
    formData.append('file', file);
    // formData.append('pdf', pdfFile); 
    formData.append('sliderValue', sliderInput.value);
    
    fetch("http://localhost:3000/sendFile", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data =>{
        // console.log(data);
        phoneNumberInput.value = "";
        textMessageInput.value = "";
        // pdfInput.value = "";
        fileInput.value = "";

        alert("Data Sent Successfully");
    })
    .catch(error => console.error('Error:', error));
});

extension.appendChild(fileUploadForm);
extension.appendChild(form);

document.body.appendChild(extension);

dropdown.addEventListener('change',()=>{
    if(dropdown.value==='file'){
        containerDiv.style.display='none';
        fileInput.style.display='block';
        fileLabel.style.display='block';
    }else if(dropdown.value==='message'){
        containerDiv.style.display='block';
        fileInput.style.display='none';
        fileLabel.style.display='none';
    }else if(dropdown.value==='message-+-file'){
        containerDiv.style.display='block';
        fileInput.style.display='block';
        fileLabel.style.display='block';
    }
})

radioInput.addEventListener('change',()=>{
    groupNameInput.style.display='none';
    phoneNumberInput.style.display='block';
})
groupRadioInput.addEventListener('change',()=>{
    groupNameInput.style.display='block';
    phoneNumberInput.style.display='none';
})
