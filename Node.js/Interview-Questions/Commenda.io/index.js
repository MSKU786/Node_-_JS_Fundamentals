3rd round
---------------------------------------------------------------
Type Invoice = {
	stateCode: string; // e.g. TX, CA
	zipCode: number; // e.g.94102
	totalAmount: number; // e.g. 554.87
}

Async getTaxRate(stateCode: string; zipCode: number) {
	Const taxRate = await fetch(); // some API Call in here

	// NEW: You can only call this API 2 times in a minute

	Return taxRate;
}

Return ExtendedInvoice: ExtendedInvoice has all the keys from Invoice + two more keys: grossAmount and taxRate

grossAmount: Amount without tax
totalAmount: Amount which got paid
taxRate: rate which got applied (a number b/w 0 and 100)

/// Start here:

Type ExtendedInvoice = Invoice & {
grossAmount: number
taxRate:number
};

Async getExtendedInvoice(invoice: Invoice): ExtendedInvoice {

	Const {stateCode, zipCode, totalAMount} = invoice;

	Const taxRate = await getTaxRate(stateCode, zipCode);
	
	Const grossAmount = totalAmount * 100 / ( 100 + taxRate);

	extendedInvoice = {...invoice, grossAmount, taxRate}

	Return extendInvoice;
}

Async getExtendedInvoices(invoices: Invoice[]): ExtendedInvoice[] {
Const extendedInvoices = invoices.map((invoice) => getExtendedINvoice(invoice) )
return extednedInvoices	
}


Async getExtendedInvoicesLimit(invoices: Invoice[]): ExtendedInvoice[] {

	Let extendedVoice = []
	Let current = 0;

	Function fetchData() {
		For (let i=current; i<invoice.length && ; i++) {
			extednedVoice.push(getExtendedINvoice(invoice[i]))
			current++;
		}
		sleep(60);

		If (current < invoice.lengtj=h)
			fetchData()
	}

	fetchData();
}


You have to implement a Dashboard where a user comes in uploads a CSV file which has like 100K records:

ID, state, zipCode, totalAmount

You have to process these all, show user progress bar on frontend and when finished you have to show a table which has all these records.


Progress
jobId, totalNumberOfRecords, tenantId, status, documentId, userId

User
userRole, metaData


Records
Id, tenantId, documentId,   invoice, timestamp
-----------------------------------------------



1st round

--------------------------------------------------------------------------------------

Corporations > Nestle Pvt. Ltd.
Corporation > Employee

[
[+ Add employee]
[+ Sync Employees Loader]

….
]

PostgresDB > Employee table
HRIS software. >> Merge

Merge.getEmployees(corporation_id , cursor: string | null) : Promise< Employees(100, sorted by their internal id), total number of employees, cursor: string | null>
Merge.GetEmployee(corporation_id, employee_email) : Promise<Employee | 404>




-> sync api 

-> /merge/getEmployess() {

	}
{
 Emplytedata = [
 	{ 
emplyoeeD	
},
coperationId,
isLastBatch,
job:id
}

sync_status
jobId => coperationid ->( processing, processed, completed) => toalNumberofUsers

Usertable


v1/sync/users?coperird:=id {
jobId
}

/get/status/:jobId {

}


Async function syncEmployees(corporationId, cursor) : Promise<{jobId}>
{
	Const response= await fetch(‘url);

	importToQueu(users, maximumbatchNumber, cursor)
	If (response.cureser0) {
		syncEmploye(cooeri, cursor)
	}
 
}
-------------------------------------------------------------------------------



--------------------------------------------------
2nd round

-------------------------------------------------
// id,
// total amount
// creation time ,
// last update   
// buyer id 
// seller id 


// write an endpoint which will basiclaly fetch all transaction for one buyer 
// or one seller


app.get('/v1/api/:id', (req, res) => {
  
  const {sellerId, offset} = req.params
  
  if (sellerId) {
    const data = fetchTransctionsSeller(sellerId, offset)
  }
  
  
  const {buyerId, offset} = req.params
  
  if (buyerId) {
    
  }
  
  res.status(401).json({
    msg: "Params missing on header"
  })
})


const fetchTransctionsSeller = async (sellerId, offset) => {
  
  let fetch100 = []
  
  for (let i=offset, i<total.length; i++) {
    if (sellerId === totalRecord[i]['sellerId']) {
      fetch100.push(totalRecord[i])
      if (fetch100.length ==)
    }
  }
  
  
}



