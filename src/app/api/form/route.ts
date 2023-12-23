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

       const data = new Contact({
        name,
        email,
        message
    })
    await data.save()
  
       const response = NextResponse.json({message:"Thank You!!!",success:true})
    return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500});
    }
}