$(function () {
  $(".sigma_box  input,.sigma_box  textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      let textMsg = document.querySelectorAll(".sigma_box .help-block");
      var name = $(".sigma_box  input#name").val();
      var email = $(".sigma_box  input#email").val();
      var subesubject = $(".sigma_box  input#subesubject").val();
      var message = $(".sigma_box  textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(" ") >= 0) {
        firstName = name.split(" ").slice(0, -1).join(" ");
      }
      if (name == "" || subesubject == "" || message == "") {
        textMsg.forEach((element) => {
          element.innerHTML = "Məlumatlar mütləq doldurulmalıdır!";
        });
      } else {
        $.ajax({
          // url: "././mail/contact_me.php", BU HISSƏDƏ URL HİSSƏSİNƏ /Controller/Method/ yazilmalidir.
          // type: "POST",
          data: {
            name: name,
            subesubject: subesubject,
            email: email,
            message: message,
          },
          cache: false,
          success: function () {
            Swal.fire({
              title: "Uğurlu əməliyyat!",
              text: "Mesajınız müvəffəqiyyətlə göndərildi",
              icon: "success",
              confirmButtonText: "Oldu",
            });

            //clear all fields
            $(".sigma_box").trigger("reset");
          },
          error: function () {
            Swal.fire({
              title: "Əməliyyatda Xəta!",
              text: "Mesaj göndərilə bilmədi",
              icon: "error",
              confirmButtonText: "Oldu",
            });
            //clear all fields
            $(".sigma_box").trigger("reset");
          },
        });
      }
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });
});
