import {connect} from '@/dbConfig/dbconfig';
import Contact from '@/model/form';
import {NextRequest,NextResponse} from 'next/server';

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {name,email,message} = reqBody;
        console.log(reqBody);

        //Check If User Exists
       const user = await Contact.findOne({email});

       if(user){
        return NextResponse.json({error:"You Can Message only Once"}, {status:400})
       }

       const data = new Contact({
        name,
        email,
        message
    })
    const savedData = await data.save()
    console.log("Saved User: ",savedData);
  
       const response = NextResponse.json({message:"Successfull",success:true})
    return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500});
    }
}