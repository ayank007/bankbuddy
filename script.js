document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
let lastScrollTop=0;
const navbar=document.getElementById("Navbar");
window.addEventListener("scroll",function(){
    let scrollTop=window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop>lastScrollTop){
        navbar.style.top="-65px";
    }else{
        navbar.style.top="0";
    }
    lastScrollTop=scrollTop;
});
$('.ham').click(function(){
    if(!$('.ham').hasClass('opened')){
        $('.ham').addClass('opened');
        $('.navs').addClass('opened');
        // setTimeout(function(){
        //     $('.navs.opened').css('overflow','visible');
        // },400);
    }
    else{
        $('.ham').removeClass('opened');
        $('.navs').removeClass('opened');
        // $('.navs').css('overflow','hidden');
    }
});
$('.navs > div > a').click(function(){
    $('.ham').click();
})
function headerParalax(e){
    this.querySelectorAll('.hi').forEach(hi=>{
        const speed=hi.getAttribute('data-speed');
        const x=(window.innerWidth - e.pageX*speed)/100;
        hi.style.transform=`translateX(${x}px)`;
    });
    const headerLogoX=(window.innerWidth - e.pageX*10)/700;
    const headerLogoY=(window.innerHeight - e.pageY*10)/500;
    $('.headerLogo').css('transform',`translate(${headerLogoX}px,${headerLogoY}px)`)
}
document.addEventListener('mousemove',headerParalax);

// contact
const scriptURL = "https://script.google.com/macros/s/AKfycbw2JIxvdKGMfRWJloVXM5k-0PxAqebqHjUJhjN2OLQvOPliaQU/exec";
const form = document.forms['contactForm']
$('.contactForm').on('submit', function(e) {
    $('.mainFormBtn').addClass('pointer-events-none');
    e.preventDefault();    
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
        swal({
            title: "Thank You!",
            text: "Your Message Has Been Sent",
            icon: "success",
            button: "Ok",
        })
        .then(msg=>{
            $('.mainFormBtn').removeClass('pointer-events-none');
        })
        form.reset();
    })
    .catch(error => {
        swal({
            title: "Sorry!!!",
            text: "Your Message Could Not Be Sent, Try Again Latter",
            icon: "fail",
            button: "Ok",
        })
    })
})
const form1=document.forms['feedback'];
$('.feedback').on('submit', function(e) {
    $('.feedbackBtn').addClass('pointer-events-none');
    e.preventDefault();    
    fetch(scriptURL, { method: 'POST', body: new FormData(form1) })
    .then(response => {
        swal({
            title: "Thank You!",
            text: "Your Feedback Has Been Sent",
            icon: "success",
            button: "Ok",
        })
        .then(msg=>{
            $('.feedbackBtn').removeClass('pointer-events-none');
        })
        form1.reset();
    })
    .catch(error => {
        swal({
            title: "Sorry!!!",
            text: "Your Feedback Could Not Be Sent, Try Again Latter",
            icon: "fail",
            button: "Ok",
        })
    })
})
// voice
const speech = new SpeechSynthesisUtterance();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recorder = new SpeechRecognition();
const voices = window.speechSynthesis.getVoices();
speech.voice = voices[1];

const voice = document.querySelector(".voice");
voice.addEventListener('click', () =>{
    window.speechSynthesis.cancel();
    recorder.start();
});
function startConversation(transcript){
    $('.typedQuery').val('')
    $('.chatBody').append(userQuery(transcript));
    transcript=transcript.toLowerCase();
    conversation(transcript);
    $(".chatBody").animate({scrollTop:$(".chatBody")[0].scrollHeight}, 500);
}
recorder.onresult = (event) => {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    startConversation(transcript);
};
$('.chatSubmit').click(function(){
    startConversation($('.typedQuery').val());
});
function userQuery(transcript) {
    let text=transcript;
    var userQueryContent=
    `<div class="chat userChat">
        <div class="con">
            <h5 class="chatName">
                You
            </h5>
            <div class="chatbox">
                ${text}
            </div>
        </div>
        <div class="thumbnail">
            <i class="fa fa-user-circle"></i>
        </div>
    </div>`;
    return userQueryContent;
}
function mikasaAnswer(text) {
    const mikasaAnswerContent=
    `<div class="chat botChat">
        <div class="thumbnail bg-dark">
            <img src="./img/bb.png" alt="">
        </div>
        <div class="con">
            <h5 class="chatName">
                Mikasa
            </h5>
            <div class="chatbox">
                ${text}
            </div>
        </div>
    </div>`;
    return mikasaAnswerContent;
}
const Nono=['no','not',"n't",'not good','bad','worst','worse','substandard','poor','inferior','nasty','terrible','dread','awful','deficient','inadequate','unacceptable','without'];
const Greetings=['hi','hello','hey','howdy','hai'];
const Good=['good','fine','well','worth','not bad'];
const Thank=['thank','tq','glad'];
const Bye=['bye','by','goodbye','see you','c u','see u','c you','latter','tata'];
const Types=['type','variety','class','category','sort','group','set','bracket','genre','genus','species','family','breed','mode','form'];
const dataSet=[
    ['how are you',[''],[''],'I am fine, thanks. How are you?'],
    ['',[''],['that','those','this','they','thing','he','she','these'],"What are you reffering? PLease be more clear."],
    ['',[''],Good,'Glad to hear that.'],
    ['',[''],Greetings,'Hey there! how can I help you?'],
    ['',[''],Bye,'Good Bye, have a nice day.'],
    ['',[''],Thank,'Glad to help you.'],
    ['',[''],['who are you','yourself','introduce'],'I am Mikasa, a banking specialist, present in your service.'],
    ['credit card',[''],[''],'A Credit Card is something that we all want, some of us have, but a lot of us don’t quite completely understand its nature. In a way, owning a Credit Card increases your purchasing power. You can use it to purchase all that you can afford, and all that you can’t quite buy cash down.'],
    ['credit card',[''],['need','why','demand'],"There are many points to have a credit card like Frequent-Flyer Miles, Bonus, Reward Points,Keeping Vendors Honest, Keeping Venders Honest, Grace Period, Insurance Etc. If you are scared to use a credit card please contact us. For more details please visit <a href='https://www.investopedia.com/articles/pf/10/credit-card-debit-card.asp' target='_blank' style='color:red;'>this Website</a> ."],
    ['',['apply','debit'],[''],'Applying for a Dedit card is a simple, straightforward process that requires some basic information. Students will need the name and location of their school in addition to a social security number and primary address'],
    ['',['fees','debit'],[''],'All banks have fees that go along with the Debit Cards they issue. However, the fees and other charges also depend upon the type of account you have.'],
    ['avoid',[''],['charges','bank fees'],'You should explain the different types of fees and charges so that the customer is clear about which banking activities are free and which ones incur charges.'],
    ['',['check','balance'],[''],'If the customer has access to the internet they will probably want to sign up for online or mobile banking services so that they can check their statement at any time of day or night.'],
    ['debit',[''],['downside','bad','con'],'As the old adage goes, there is never a free lunch. We’ve already mentioned using Credit Cards over Debit Cards for online purchases.'],
    ['',['visa','master'],[''],'One of the first things you’ll notice about your Debit Card is a Visa or Mastercard logo on it. The truth is, it doesn’t really matter who the bank’s transactions partner is, as both are accepted globally for payments.'],
    ['bounce',[''],[''],'A bounced check occurs when the writer of the check has insufficient funds available to fulfill the payment amount on the check to the payee.'],
    ['',['bounce'],['when','if','bad'],'If a check bounces, the payee reports the issue to debit bureaus such as ChexSystems, which collects financial data on savings and checking accounts.'],
    ['',['wrong','account'],[''],'Applying for a Dedit card is a simple, straightforward process that requires some basic information. Students will need the name and location of their school in addition to a social security number and primary address.'],
    ['',['operate','different','account'],[''],'You can operate your bank accounts in different ways like a) Internet banking b) Telephone or Mobile banking c) Branch or Over the counter service d) ATM ( Automated Teller Machine).'],
    ['loan',[''],Types,'The different types of loans offered by banks are: a) Unsecured Personal Loan b) Secured Personal Loan c) Auto Loans d) Mortgage Loans e) Small business Loans.'],
    ['account',[''],Types,'a) Checking Account: You can access the account as the saving account but, unlike saving account, you cannot earn interest on this account. The benefit of this account is that there is no limit for withdrawal b) Saving Account: You can save your money in such account and also earn interest on it. The number of withdrawal is limited and need to maintain the minimum amount of balance in the account to remain active c) Money Market Account: This account gives benefits of both saving and checking accounts. You can withdraw the amount and yet you can earn higher interest on it. This account can be opened with a minimum balance. d) CD (Certificate of Deposits) Account: In such account you have to deposit your money for the fixed period of time (5-7 years), and you will earn the interest on it. The rate of interest is decided by the bank, and you cannot withdraw the funds until the fixed period expires.'],
    ['',['credit','work'],Nono,"If you have activated your new credit card and found that it does not work, you should contact your credit card company.Most new credit cards are sent in a de-activated state to the mailing address you provided on your application. This is to prevent unauthorized use in case the card is lost or stolen before you receive it.Instructions on how to activate the card should be enclosed. If you don't see them, call your credit card company."],
    ['deposit',[''],['abandoned','unclaimed'],'Generally, an account is considered abandoned or unclaimed when there is no customer-initiated activity or contact for a period of three to five years. The specific period is based on the escheatment laws of each state.'],
    ['',['cheque','endorsing'],[''],'Endorsing cheque ensures that the cheque get deposited into your account only. It minimizes the risk of theft. Normally, in endorsing cheque, the cashier will ask you to sign at the back of the cheque. The signature should match the payee. The image over here shows the endorsed cheque.'],
    ['',['loan','interest'],Types,'There are two types of interest rate options. They are:a)Fixed Interest Rate b)Floating Interest Rate.'],
    ['',['one','time','bonus'],[''],"There's nothing like an initial bonus opportunity when getting a new credit card. Often times, applicants with good credit or excellent credit can get approved for credit cards that offer bonuses worth $150 or more (sometimes much more) in exchange for spending a certain amount (anywhere from $500 to several thousands of dollars) in the first several months the account is open"],
    ['',['credit','cashback'],[''],"The cash back credit card was first popularized in the United States by Discover, and the idea was simple: Use the card and get 1% of your purchases rebated in the form of cash back. Today, the concept has grown and matured. Now, some cards now offer 2%, 3% or even as much as 6% cash back on selected purchases, though such lucrative offers involve quarterly or annual spending caps.1 The best cash back cards are those that charge minimal fees and interest, while offering a high rewards rate."],
    ['',['reward','point'],[''],"Reward points credit cards are set up to allow cardholders to earn one or more points per dollar in spending. Many reward credit cards provide bonus points for certain categories of spending like restaurants, groceries or gasoline. When certain earnings thresholds are reached, points can redeemed for travel, gift cards from retailers and restaurants, or for merchandise items through the credit card company's online rewards portal."],
    ['',['frequent','flyer'],[''],"This perk predates almost all the rest. Back in the early 1980s, American Airlines began offering the consumers a novel way to earn frequent-flyer miles when not flying by forming a partnership with credit card giant Citibank.4 5 Now, all domestic and international airlines have at least one credit card available offered in similar partnership with major credit card issuers."],
    ['',['credit','safe'],[''],"Paying with a credit card makes it easier to avoid losses from fraud. When your debit card is used by a thief, the money is missing from your account instantly. Legitimate expenses for which you've scheduled online payments or mailed checks may bounce, triggering insufficient funds fees and making your creditors unhappy. Even if not your fault, these late or missed payments can also lower your credit score.6 It can take a while for the fraudulent transactions to be reversed and the money restored to your account while the bank investigates."],
    ['',['credit','honest'],[''],"Say you hire a tile setter to set some flooring in your entryway. Workers spend the weekend cutting, measuring, grouting, placing the spacers and tiles and letting the whole thing set. They then charge you $4,000 for their troubles. You draw upon your savings account and write a check. But what do you do when, 72 hours later, the tile starts to shift and the grout still hasn't set? Your entryway is now a complete mess, and that vein in your forehead won't stop throbbing."],
    ['',['greace','period'],[''],"Hanging on to your funds for this extra time can be helpful in two ways. First, the time value of money, however infinitesimal, will save you money. Delaying eventual payment makes your purchase a tiny bit cheaper than it would be otherwise. Beyond that, your cash will spend more time in your bank account, and if you pay your credit card from an interest-bearing checking account and earn on your money during the grace period, the extra will eventually add up to a meaningful amount. vs. paying with a debit card, cash or check."],
    ['',['credit','insurance'],[''],"Most credit cards automatically come with a number of consumer protections that people don't even realize they have, such as rental car insurance (though often secondary to your personal auto insurance), travel insurance, and product warranties that may exceed the manufacturer's warranty."],
    ['',['credit'],Nono,"Paying with credit cards isn't always better than paying with cash. Retailers honor credit cards because they want to make it easy for you to shop there. But the merchants still have to pay the major credit card companies a portion of every sale in the form of a transaction fee. Since a cash sale means more to the retailer's bottom line than an equivalent credit sale does, some retailers give discounts for the privilege of taking your cash immediately. On a big item, like a furniture set, the difference could be substantial. However, you'll forego the previously mentioned consumer protections offered by credit cards."],
    ['',['credit','point'],[''],"Points are incentives that can be accumulated through your credit card's cash back, reward or loyalty programs, typically in point, cash back or miles categories. These points are typically accumulated by making purchases with your credit card on specific categories, are updated each billing cycle and may be viewed or redeemed on the credit issuer, hotel or airline's online portal. When applying for a credit card, you may want to consider what type of bonus rewards the issuer offers and whether the set of approved purchases and selected retailers align with your lifestyle and spending habits."],
    ['',['credit','point'],Good,"Your lifestyle and spending habits will influence whether reward points are worth it to you. There may also be opportunities to earn cash back points by making your regular grocery, department store, and gas station purchases on a reward credit card. Frequent travelers may find it convenient and worthwhile to book hotel rooms and flights through select travel booking sites to earn miles or points or enroll in co-branded loyalty programs for exclusive point accumulation. Bonus promotions (which have spending requirements) could also offer new users generous point redemption, depending on the promotion being offered."],
    ['',['apply','credit'],[''],"Applying for a credit card is a simple, straightforward process that requires some basic information. Students will need the name and location of their school in addition to a social security number and primary address. For security purposes, you may need to know your mother’s maiden name."],
    ['credit',[''],['many','number','ammount'],"There is no “right” number of credit accounts to build a solid credit history. According to Experian, there are many factors that make up a credit score (and every reporting agency has many formulas), but late or missed payments, frequency of credit inquiries, and your credit utilization ratio are all major factors.1 When you’re starting out with credit, it can be safer to begin with one or two cards to ensure you can make payments consistently before adding more."],
    ['',['annual','percentage'],[''],"There are a few reasons your Annual Percentage Rate can go up even if you’re up to date on all payments. These include a decrease in your credit score, the end of a card-related promotion, a change in the prime rate if you have a variable-rate card, or if you have made late payments."],
    ['',['online','credit','debit'],[''],"Advantages to online shopping with a credit card over a debit card usually include more purchase protection along with additional warranties and rewards. Not all cards are created equal, but many of the top credit cards offer benefits such as purchase protection, extended warranties, return guarantees, and rewards programs."],
    ['rewards',[''],['redeem','get','accept','take','receive'],"Some programs have no expiration dates and you can earn and use rewards whenever it’s convenient for you. Others have annual programs with “use it or lose it” clauses requiring that you redeem rewards within a certain time period or else forfeit their value. Be sure to read your Credit Card Agreement to understand if and when rewards expire."],
    ['credit',[''],['approv','accept','allow'],"Receiving a pre-approved credit card offer means that a credit card issuer has verified with a credit bureau that you meet its credit criteria and has pre-approved you as a quality candidate for its product. You’ll still need to apply in order to actually receive a new credit card, at which point you may still be accepted or denied."],
    ['',['credit','instant'],['approv','accept','allow'],"Instant approval means you’ll receive a quick answer to your application for a new credit card. Typically, only people with good to excellent credit scores are granted instant approval. Learn more about instant approval credit card offers."],
    ['credit',[''],['age','old'],"18 is typically the minimum age to apply independently for a credit card in the United States. However, people under 18 can be added as authorized users to their parents’ accounts."],
    ['',['credit','overspend'],[''],"YES! I’d like to be fair and say it depends on you, but the fact is people with credit cards tend to overspend compared to paying only in cash. It’s a fact that our brains react differently to paying with cash or credit. When you pay with cash, you do that mental accounting to work out your balance. That keeps you from spending more than you have in savings. People don’t usually do this same mental bookkeeping when using credit."],
    ['credit',[''],['long','time'],"It takes less than five minutes to apply for a credit card and approval is usually immediate. If you’re denied a card, you’ll get a letter within a few weeks telling you why. If you are approved for a card, you’ll usually get the card and other documents within a couple of weeks. Your card will sometimes come separate from an activation code to make sure someone can’t steal it from the mail."],
    ['',['annual','fee'],[''],"Annual fees on credit cards are an additional charge, usually from $50 to $150, beyond the interest rate you pay. My first reaction is to say you should never apply for a card that charges an annual fee. Most reward program cards have annual fees though so it’s not as simple as just avoiding any card with a fee."],
    ['',['miss','payment'],[''],"Missing a credit card payment isn’t the end of the world but you do need to be on top of it. The late payment won’t affect your credit score until it’s 30 days late and you might be able to get an extension if you call the card company.If you don’t call the card issuer then a late fee of between $27 to $35 will be added to your bill. This doesn’t mean you’re off the hook for that payment and your interest rate will usually reset to 24% or more."],
    ['',['credit','bill'],Nono,"Missing payments on your credit cards will destroy your FICO and make it more expensive to get any loans. That’s why it’s important to contact your credit card issuer as soon as you start having trouble paying the bill to work out some kind of a plan.Not paying your credit card for six months and not working out a plan will usually mean the debt gets sold to a collection agency. This is the worst thing that can happen because not only will you still owe all the charges and fees but now there are two bad accounts on your credit, the card issuer and the agency."],
    ['',['apr','interest'],[''],"The annual percentage rate (APR) is the actual rate you pay on your charges. The APR includes all the extra fees added to the card as well as the way the interest rate is calculated. Interest is calculated on a daily basis, so you’re stated interest rate divided by 365 days. This daily rate is multiplied by your average daily rate for the amount of interest you actually pay each month."],
    ['',['balance','transfer'],[''],"A balance transfer is exactly what it says, transferring the balance from one debt to another credit card. Transferring to a new card usually brings the benefit of a 0% introductory rate for six months to a year and no transfer fees."],
    ['',['secure','card'],[''],"Secured cards are a lot like debit cards but they can help you build your credit score. Like a debit card, your secured card is backed by money you put into an account, but your card still works like credit. You borrow the money charged and then make a payment at the end of the month."],
    ['',['credit','debit'],[''],"Debit cards are linked to your checking account and you can only spend as much as you have cash available. That means it’s not a loan like a credit card so there’s no interest rate. There are also no payments so no late fees to worry about either.Debit cards might claim to be reported on your credit report, but they don’t help your credit score. You’re not making any payments so there’s no way to build up a payment history."],
    ['',['credit','limit'],[''],"This represents the maximum amount a cardholder can spend on purchases. To state an example, let’s say you have a Credit Card with a credit limit of Rs. 50,000. This means, you can spare Rs. 50,000 in a month on purchases. If you touch the Rs. 50,000 mark in a month, then you are ‘over the credit limit’ or ‘maxing out the card’. All your transactions will be declined once you cross the credit limit."],
    ['debit',[''],['why','important','importance'],"For many people, it is more convenient to carry a small, plastic card instead of a bulky checkbook or a large amount of cash. Using a debit card is also easier and faster than writing a check"],
    ['',['debit','cost'],[''],"There may be fees for using your debit card. Examples: Some banks charge a fee if you enter a PIN (Personal Identification Number) to conduct a transaction instead of signing your name. You may trigger a fee if you overdraw your account using your debit card, just as you would if you bounced a check."],
    ['reward',[''],Good,"For many people, it is more convenient to carry a small, plastic card instead of a bulky checkbook or a large amount of cash. Using a debit card is also easier and faster than writing a check."],
    ['',['debit','overdraw'],[''],"First, because the payments are electronic, they are deducted from accounts more quickly than when using a paper check."],
    ['debit',[''],['block','hold'],"Yes, in certain circumstances, merchants can take these steps as protection against fraud, errors or other losses."],
    ['',['debit','fraud'],[''],"Protect your debit card as well as the account number, expiration date, security code on the back, and the PIN. 'Even if you never lose possession of your card, someone who learns your account number, security code and PIN may be able to use that information to access your account and create counterfeit cards,' said Aurelia Cardamone, an FDIC Senior Technology Specialist."],
    ['',['debit','protection'],[''],"The federal Electronic Fund Transfer Act (EFTA) protects you from errors, loss or theft of your debit card."],
    ['',['debit','safe'],[''],"A Debit Card is a pretty secure way to access your money. It’s protected by the bank’s anti-fraud policy – so if you lose it, or someone steals your details, you can cancel/block it. You also need a Personal Identification Number (PIN) to withdraw money from an ATM."],
    ['',['debit','safe','online'],[''],"As far as possible, never use your Debit Card for online transactions. The level of protection against fraud is much lower if you use it, and disputes can be difficult to resolve."],
    ['',['stop','payment'],['withdraw','transfer'],"If you authorized the bank to make the transfer to the merchant on your behalf, you need to revoke your authorization with the bank.You will need to notify your bank at least three business days before the scheduled date of the transfer and inform it that you wish to stop payment."],
    ['',['wire','transfer'],[''],"The term “wire transfer” is often used to refer to any electronic transfer of money from one person to another. The term “wire transfer” also has a more narrow technical meaning, referring to one certain method of transferring funds, which usually involves an electronic transfer of funds from one bank or credit union account to another. "],
    ['transaction',[''],['more','number','ammount'],"Yes, companies accepts partial payments , you may use one payment method for a part of the transactions and another payment method for other parts of the transaction."],
    ['transaction',[''],Types,"You can pay by credit or debit card or you may issue an electronic check from your bank account (checking or savings). Please check the Company's website for the credit and debit cards that are eligible."],
    ['',['email','payment'],Nono,"Yes, you have several options. You can access the payment portal from any internet supported computer, you can call the Company to see if they accept electronic payments over the phone, or mail your check in and it can be converted into an electronic transaction."],
    ['',['cost','online'],[''],"There are no signup costs or subscription fees. There are fees imposed by Invoice Cloud for returned payments, and your bank may charge you a fee based on the bank’s fee schedule."],
    ['',['payment','accept'],[''],"After you submit your payment, you will see a payment confirmation screen. It will contain your payment confirmation message. It will show an approved number for credit cards or a processed number for electronic check. You will also receive a confirmation email after your transaction is submitted. The email will include your account number, invoice number, amount paid, and confirmation message."],
    ['',['time','credit','online'],[''],"Credit card transactions typically take 48 hours to settle. An authorization is issued immediately; however, it takes 48 hours for the money to be moved."],
    ['',['time','online'],['eft','electronic funds transfer'],"EFT transactions typically take 48 – 72 hours to settle."],
    ['payment',[''],['information','what'],"The only information you need to have available to complete an express payment transaction is your email address, password and your bank account or credit card information. Some billers do not accept express payments and then you would need your account number as well."],
    ['print',[''],['payment','transfer','bill'],"Yes, each invoice is presented in PDF and HTML format. Electronic storage is recommended because it saves paper and has a beneficial impact on our environment."],
    ['',['auto','pay'],[''],"If you elect to opt in to Auto-Pay, it means that your bills will be paid automatically on their due date or date you choose using your default credit card or bank account. This will avoid any late fees and free you from having to remember when to pay."],
    ['',['auto','pay','cancel'],[''],"Yes, simply go into your profile and uncheck the auto-pay box that you had previously checked when you elected to opt into Auto-Pay."],
    ['',['auto','pay','schedul'],[''],"Auto-pay is an automated process, which pays your balance in full each billing cycle 2 days prior to the due date, scheduled payments are manually entered by you for the date you choose each time you make a payment."],
    ['',['website','secure'],[''],"Before entering payment details on a website, you can make sure that the link is secure in these ways: There should be a padlock symbol in the browser window frame, which appears when you attempt to log in or register. Be sure that the padlock is not on the page itself … this will probably indicate a fraudulent site. The web address should begin with ‘https://’. The ‘s’ stands for ‘secure’. If using the latest version of your browser, the address bar or the name of the site owner will turn green."],
    ['',['bank','block'],[''],"Sometimes banks block transactions for security reasons, particularly if it’s an unexpected payment, as they may suspect the card has been stolen and is being used fraudulently. If your transaction has been blocked, you should contact your bank to authorise the payment. You’ll need to provide details of your transaction: date, time and the amount of money sent."],
    ['document',[''],['transfer','payment'],"Most of the time when you’re transferring money to another country you won’t need to provide any extra documents. But sometimes, depending on the precise details of your money transfer, Bank will need extra information. This could mean providing proof of ID, proof of funds, or proof of address. This may take a bit of extra time, but it’s all about making sure that everything that is done is safe and secure. Proof of identity could be a passport,ID card, or a driver’s licence. Proof of address could be a utility bill, bank statement or credit card statement. Proof of funds could be a pay-slip, bank statement, or credit card statement."],
    ['',['avoid','credit','debit'],[''],"One simple rule: pay your bill in full and on time every month. Late fees can impact your pocketbook, and late or missed payments can also have a negative effect on your Dedit score."],
    ['',['shop','debit','credit'],[''],"Advantages to online shopping with a credit card over a debit card usually include more purchase protection along with additional warranties and rewards. Not all cards are created equal, but many of the top credit cards offer benefits such as purchase protection, extended warranties, return guarantees, and rewards programs."],
    ['',['account','cheque'],[''],"A checking account is a bank account that allows easy access to the funds in your bank account. Also called a transactional account, it’s the account that you will use to pay your bills and make most of your financial transactions."],
    ['',['balance','mobile'],[''],"Customers can check their BOB account balance without a mobile number by logging into the net-banking portal provided by the bank. After login, go to ‘Accounts’, select your bank account, select ‘Account Query’ and click on ‘Account Balance’."],
    ['',['bank of baroda','balance','check'],[''],"Bank of Baroda Account Balance Check Balance enquiry is one of the basic transactions that account holders carry out for different reasons. Bank of Baroda allows its customer to check their account balance in the ways listed here: Passbook: A passbook is the simplest way for account holders to check their account balance."],
    ['',['bank','cheque'],['other','each'],"All banks might have clerks to take cheques drawn on other banks to those banks, and wait for payment. Clearing houses were set up to streamline the process by collected all cheques drawn on other banks, and collecting payment from those banks for the total to be cleared. As volume grew, more efficient sorting methods were developed."],
    ['',['name','cheque'],[''],"A bank check is often referred to by many names. It can be called an official check, teller’s check, cashier’s check and a bank draft among many others. A bank check is often treated as cash because it is drawn upon a bank account and funds are withdrawn immediately."],
    ['',['cheque','kit'],[''],"Check-kiting is also known as “taking advantage of the float.” Float time is the amount of time between when an individual submits a check as payment and when the individual’s bank is instructed to move the funds from the account."],
    ['cheque',[''],Types,"Different types of bank checks include cashier's checks, certified checks and personal checks, each of which offers different features and requirements for redemption. Some banks also offer traveler's checks and money orders, which simulate the use of other checks and cash without the same requirements or limitations."],
    ['cheque',[''],['bounce','fake'],"First, it is fraudulent to willingly and knowingly deposit a fake check. Second, when it bounces, and you know it will, the bank will come after you for the funds, plus their fees, which could amount to $100 or more. Then, comes the part when they call the police and have you arrested for fraud."],
    ['',['cash','out'],[''],"Cash-out: This scam targets multiple accounts from the same financial institution. Armed with a hacked bank employee’s credentials, the criminal alters account balances and withdrawal limits. Using stolen debit card numbers captured from a separate skimming attack, they can “cash out” the ATM until it’s out of money."],
    ['',['cheque','atm'],[''],"No, you usually can’t cash a check at an ATM. ATMs have a limit to the amount of cash inside of them and can run out of money. Furthermore, most banks need to ensure the check you deposit has the funds in that account to cover the amount of the check. Therefore, they won’t allow access to the funds from."],
    ['',['atm','fraud'],[''],"ATM Security Automated teller machines (ATM) have always been a big target for criminals. ATM related fraud has become a worldwide issue, which affects financial institutions as well as its customers."],
    ['',['cheque','deposit','atm'],[''],"Video of the Day. The ATM will prompt you to insert the checks into a special slot for check deposits. Once the slot closes, you'll need to wait until the ATM verifies the amount of your check. If you deposit more than one check, the ATM displays an image of each one so you can verify the amounts before you complete the deposit."],
    ['',['cheque','withdraw','atm'],[''],"The steps are similar to making a withdrawal but can only be done at an ATM affiliated with the bank with which you have an account. Endorse your check by signing your name on the signature line on the back. Place your check inside of a deposit envelope, if required."],
    ['atm',[''],['risk','safe'],"How the check was deposited. A mobile or ATM deposit increase risk due to the anonymity they afford the depositor. If there are sufficient funds in the account to cover the check value. The length of the institution’s relationship with the customer. A new customer brings an elevated risk compared to an established relationship."],
    ['',['atm','cheque','large'],[''],"The Safety of ATMs for Deposits. For the most part, yes, your deposits should show up without error. However, you should consider the consequences of an error. If you’re making a large deposit or if you’re in danger of bouncing checks, the ATM might not be your best choice."],
    ['',['cheaue','fund'],[''],"It can be called an official check, teller’s check, cashier’s check and a bank draft among many others. A bank check is often treated as cash because it is drawn upon a bank account and funds are withdrawn immediately. This is why a bank check is guaranteed funds."],
    ['',['check','bank'],[''],"Locate a scanner. Generally, it's safer to use a scanner in your own home, but you can also use a scanner at a library or at work. Basically, you need to be able to scan the check into your computer. The bank will use this scan to read the check, so it must be clear. Endorse your check."],
    ['',['deposit','fake','cheque'],[''],"If a person knowingly deposits a fake check, with the intent to obtain money that is not theirs or to deceive a bank employee, they will usually be subject to criminal consequences. These consequences can include jail time and/or criminal fines."],
    ['',['consequence','cheque'],Nono,"If the deposited check was not the result of fraudulent activity, the bank will require you to pay any fees and overdraft charges that occur on your account as a result of the check. If the fees cause your account to have a negative balance, and you fail to pay it, the bank may close the account."],
    ['',['deposit','atm'],['different','other'],"If you use a deposit ATM from another bank (within the network) your funds may not show up in your account as quickly. That's fine if you've got sufficient funds in your account, but it can cause overdrafts, fees, and other problems if you don't."],
    ['',['deposit','cheque','permission'],Nono,"If someone deposits a check into your account without your permission, you must inform your bank that you have been the victim of fraud, especially if you have unknowingly removed funds from the account based upon that check. The bank will place a freeze on the account to prevent any further transactions from posting to the account."],
    ['',['fake','cheque','how'],[''],"The fraudster uses the information to deposit a fake check. Once the deposit has been made, the scammer will request funds to be immediately transferred back to them via money order, person to person transfer, wire transfer, reloadable cards or even gift cards."],
    ['',['monile','cheque','fraud'],[''],"Be Aware of Mobile Check Deposit Fraud! Mobile check deposit has fast become one the most convenient ways to deposit a check. Simply snap a photo of the front and back of the check and deliver the image through the mobile check app. The check is deposited without having to visit a branch or ATM."],
    ['',['cheque','deposit'],Nono,"If the deposited check was not the result of fraudulent activity, the bank will require you to pay any fees and overdraft charges that occur on your account as a result of the check. If the fees cause your account to have a negative balance, and you fail to pay it, the bank may close the account and report you to ChexSystems."],
    ['',['cheque','deopsit','bounce'],[''],"The process takes time, and a check still can bounce after you deposit it—even if your bank allows you to withdraw cash from that deposit. Did It Really Clear? Unfortunately, the term “clear” sometimes gets used prematurely. An item has only cleared after your bank receives funds from the check writer’s bank."],
    ['check',[''],['overpayment','scam'],"After obtaining a victim's bank account, Social Security number and other details, they may actually send a loan payment or direct deposit. The victim may be asked to make an immediate good faith payment out of that money but as with the check overpayment scam, the loan is fraudulent."],
    ['',['verafin','cheque'],['deposit','fraud'],"Verafin’s approach to check deposit fraud detection protects an institution from its front-line to back office. It also enhances the investigation process by providing a complete picture in a centralized location—allowing for quicker, more confident decision-making."]
]
console.log(dataSet[0])
function conversation(message) {
    const voices = window.speechSynthesis.getVoices();
    speech.voice = voices[1];
    speech.text = 
    `Sorry, I could not quite get that!!!! <br>
    Please try again, Or
    <a href="#Contact" style="color:red;">Click Here</a>
    to directly message us. <br>
    Thank You...`;
    for(let i=dataSet.length-1;i>=0;i--){
        if(message.includes(dataSet[i][0]) && dataSet[i][1].every(el=>message.includes(el)) && dataSet[i][2].some(el=>message.includes(el))){
            speech.text=dataSet[i][3];
            break;
        }
    }
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    $(".chatBody").append(mikasaAnswer(speech.text));
}
$('.typedQuery').on('keypress',function(e) {
    if(e.which == 13) {
        $('.chatSubmit').click();
    }
});

