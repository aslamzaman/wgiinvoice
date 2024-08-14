import mongoose,{ Schema } from "mongoose";


const PostSchema = new Schema(
    {
        nmEn: { type: String, required: true },
        nmBn: { type: String, required: true },    
        nmUn: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);  

//------------------------------------------------------------------------------
const AuthorSchema = new Schema(
    {
        name: { type: String, required: true },
        postId: { type: Schema.Types.ObjectId, ref: 'Post' }      
    },
    {
        timestamps: true
    }
);

export const AuthorModel = mongoose.models.Author || mongoose.model("Author", AuthorSchema);  

//------------------------------------------------
const ProjectSchema = new Schema(
    {
        name: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const ProjectModel = mongoose.models.Project || mongoose.model("Project", ProjectSchema);  

//-----------------------------------------------------

const UnitSchema = new Schema(
    {
        nmEn: { type: String, required: true },
        nmBn: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const UnitModel = mongoose.models.Unit || mongoose.model("Unit", UnitSchema);  
//----------------------------------------------------

const PlaceSchema = new Schema(
    {
        name: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const PlaceModel = mongoose.models.Place || mongoose.model("Place", PlaceSchema); 
//----------------------------------------------


const GenderSchema = new Schema(
    {
        name: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const GenderModel = mongoose.models.Gender || mongoose.model("Gender", GenderSchema); 

//----------------------------------------------------

const StaffSchema = new Schema(
    {
        nmEn: { type: String, required: true },
        nmBn: { type: String, required: true },
        nmUn: { type: String, required: true },
        joinDt: { type: Date, required: true },
        mobile: { type: String, required: true },
        genderId: { type: Schema.Types.ObjectId, ref: 'Gender' },
        postId: { type: Schema.Types.ObjectId, ref: 'Post' },
        projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
        pictureUrl: { type: String, required: true },
        empId: { type: String, required: true },
        placeId: {  type: Schema.Types.ObjectId, ref: 'Place'  },
        unitId: {type: Schema.Types.ObjectId, ref: 'Unit' },
        status: { type: Number, required: true },
        remarks: { type: String, required: true },
        salary: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false }      
    },
    {
        timestamps: true
    }
);

export const StaffModel = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);  


//------------------------------------------------------

const TaSchema = new Schema(
    {
        unitId: { type: Schema.Types.ObjectId, ref: 'Unit' }, 
        tk: { type: Number, required: true }       
    },
    {
        timestamps: true
    }
);

export const TaModel = mongoose.models.Ta || mongoose.model("Ta", TaSchema); 

//-----------------------------------------------------


const DaSchema = new Schema(
    {
        postId: { type: Schema.Types.ObjectId, ref: 'Post' }, 
        tk: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const DaModel = mongoose.models.Da || mongoose.model("Da", DaSchema);  

//--------------------------------------------------------


const PriceSchema = new Schema(
    {
        name: { type: String, required: true },
        tk: { type: Number, required: true }       
    },
    {
        timestamps: true
    }
);

export const PriceModel = mongoose.models.Price || mongoose.model("Price", PriceSchema);  

//-------------------------------------------------------------

const DistrictSchema = new Schema(
    {
        nmEn: { type: String, required: true },
        nmBn: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const DistrictModel = mongoose.models.District || mongoose.model("District", DistrictSchema);  


//-----------------------------------------------------


const ElectricSchema = new Schema(
    {
        description: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const ElectricModel = mongoose.models.Electric || mongoose.model("Electric", ElectricSchema);  

//----------------------------------------------------------------------


const UserSchema = new Schema(
    {
        user_name: String,
        pw: String
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

//---------------------------------------------------------------


const MobileSchema = new Schema(
    {
        registeredUser: { type: String, required: true },
        presentUser: { type: String, required: true },
        mobileNo: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const MobileModel = mongoose.models.Mobile || mongoose.model("Mobile", MobileSchema);  
//-----------------------------------------------------------


const UnitsalarySchema = new Schema(
    {
        staffId: { type: Schema.Types.ObjectId, ref: 'Staff' },
        arear: { type: String, required: true },
        sal1: { type: Number, required: true },
        sal2: { type: Number, required: true },
        remarks: { type: String, required: true },
        isDeleted: { type: Boolean, default: false } 
    },
    {
        timestamps: true
    }
);

export const UnitsalaryModel = mongoose.models.Unitsalary || mongoose.model("Unitsalary", UnitsalarySchema);  
//---------------------------------------------------------------------

const HondaSchema = new Schema(
    {
        regNo: { type: String, required: true },
        regDt: { type: String, required: true },
        chassisNo: { type: String, required: true },
        engineNo: { type: String, required: true },
        condition: { type: String, required: true },
        projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
        unitId: { type: Schema.Types.ObjectId, ref: 'Unit' },  
        remarks: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const HondaModel = mongoose.models.Honda || mongoose.model("Honda", HondaSchema);  

//--------------------------------------------------------------------

const HondahistorySchema = new Schema(
    {
        hondaId: {type: Schema.Types.ObjectId, ref: 'Honda' },
        location: { type: String, required: true },
        projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
        staffId: { type: Schema.Types.ObjectId, ref: 'Staff' },
        postId: { type: Schema.Types.ObjectId, ref: 'Post' },
        dt: { type: String, required: true },
        remarks: { type: String, required: true },
        picUrl: { type: String, required: true },
        pageNo: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }      
    },
    {
        timestamps: true
    }
);

export const HondahistoryModel = mongoose.models.Hondahistory || mongoose.model("Hondahistory", HondahistorySchema);  









