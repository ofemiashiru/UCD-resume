const sendMail = function(contactForm){
    emailjs.send(
        "service_g84hf2i", "template_afgnwq7", 
        {
            from_name: contactForm.name.value,
            from_email: contactForm.emailaddress.value,
            project_request: contactForm.descritpion.value   
        }, 
        "0Srwr_bwVJqHDTfFz"
    )
    .then(respsone => {
        console.log('SUCCESS', respsone)

        document.querySelectorAll('.form-control').forEach((input) => {
            input.value = ''
        })

        document.querySelector('#emailRespsone').innerHTML = "Your message has been sent"
    },(error) => {
        console.error('error:', error)
        
        document.querySelector('#emailRespsone').innerHTML = "An error has occurred"
    })
    


    return false // prevents page refreshing
}