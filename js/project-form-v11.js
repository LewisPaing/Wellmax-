const form=document.querySelector('#project-form');
form?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const data=new FormData(form),value=name=>String(data.get(name)||'').trim();
  const subject=`Project enquiry — ${value('company')||value('name')}`;
  const body=[`Name: ${value('name')}`,`Company / brand: ${value('company')||'Not provided'}`,`Email: ${value('email')}`,`Service: ${value('service')}`,`Approximate budget: ${value('budget')||'Not provided'}`,'',`Project details:`,value('message')].join('\n');
  location.href=`mailto:wellmaxadvertisingmedia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
