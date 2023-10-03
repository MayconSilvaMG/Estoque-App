using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Descontrolada.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string ProductLocation { get; set; }
        public int ProductQtd { get; set; }
    }
}
