using Microsoft.EntityFrameworkCore;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dal
{
   public class CaseProjectContext :DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseNpgsql("User ID=postgres;Password=furkan38;Server=localhost;Port=5432;Database=casedb;Integrated Security=true;Pooling=true;");
            optionsBuilder.UseSqlServer("Server=localhost;Database=AnaokuluDb;Trusted_Connection=Yes;");

        }

        public DbSet<User> User { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Articles> Articles { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Articles>().HasOne(x => x.Kategori).WithMany().HasForeignKey(x => x.KategoriId)
           .OnDelete(DeleteBehavior.Cascade);
         
        }

    }
}
