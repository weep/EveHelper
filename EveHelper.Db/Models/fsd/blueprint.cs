using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EveHelper.Db.Models.fsd
{
    public class Blueprint
    {
        public ActivitiesModel Activities { get; set; }
        public int BlueprintTypeID { get; set; }
        public int MaxProductionLimit { get; set; }

        public class ActivitiesModel
        {
            public CopyingModel Copying { get; set; }
            public ManufacturingModel Manufacturing { get; set; }

            public class CopyingModel : ITime { public int Time { get; set; } }
            public class ManufacturingModel : ITime
            {
                public List<MaterialsModel> Materials { get; set; }
                public List<ProductsModel> Products { get; set; }
                public int Time { get; set; }

                public class MaterialsModel : IQuantity, ITypeID { public int Quantity { get; set; } public int TypeID { get; set; } }
                public class ProductsModel : IQuantity, ITypeID { public int Quantity { get; set; } public int TypeID { get; set; } }
            }

            public class ResearchMaterialModel : ITime { public int Time { get; set; } }
            public class ResearchTimeModel : ITime { public int Time { get; set; } }
        }
    }
}
