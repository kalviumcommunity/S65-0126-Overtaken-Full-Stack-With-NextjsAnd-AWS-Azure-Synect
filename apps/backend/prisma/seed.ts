import { BookingStatus, InternshipStatus, PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await hash("Password123", 10);

  const student = await prisma.user.upsert({
    where: { email: "student@synect.dev" },
    update: {
      role: Role.STUDENT,
      passwordHash,
    },
    create: {
      email: "student@synect.dev",
      passwordHash,
      role: Role.STUDENT,
    },
  });

  const mentor = await prisma.user.upsert({
    where: { email: "mentor@synect.dev" },
    update: {
      role: Role.MENTOR,
      passwordHash,
    },
    create: {
      email: "mentor@synect.dev",
      passwordHash,
      role: Role.MENTOR,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@synect.dev" },
    update: {
      role: Role.ADMIN,
      passwordHash,
    },
    create: {
      email: "admin@synect.dev",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.studentProfile.upsert({
    where: { userId: student.id },
    update: {
      fullName: "Student Demo",
      university: "Synect University",
      program: "Computer Science",
      graduationYear: 2027,
      bio: "Focused on backend engineering and internships.",
    },
    create: {
      userId: student.id,
      fullName: "Student Demo",
      university: "Synect University",
      program: "Computer Science",
      graduationYear: 2027,
      bio: "Focused on backend engineering and internships.",
    },
  });

  await prisma.mentorProfile.upsert({
    where: { userId: mentor.id },
    update: {
      fullName: "Mentor Demo",
      expertise: "Backend Systems, API Design",
      bio: "Guides students on internships and interview preparation.",
    },
    create: {
      userId: mentor.id,
      fullName: "Mentor Demo",
      expertise: "Backend Systems, API Design",
      bio: "Guides students on internships and interview preparation.",
    },
  });

  await prisma.internship.deleteMany({ where: { studentId: student.id } });
  await prisma.booking.deleteMany({ where: { studentId: student.id } });
  await prisma.mentorAvailability.deleteMany({ where: { mentorId: mentor.id } });

  await prisma.internship.createMany({
    data: [
      {
        studentId: student.id,
        company: "Acme Labs",
        roleTitle: "Backend Intern",
        status: InternshipStatus.APPLIED,
        notes: "Applied through referral.",
      },
      {
        studentId: student.id,
        company: "Northwind Tech",
        roleTitle: "Platform Intern",
        status: InternshipStatus.ACTIVE,
        notes: "Interview round in progress.",
      },
    ],
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const slot = await prisma.mentorAvailability.create({
    data: {
      mentorId: mentor.id,
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 30 * 60 * 1000),
      isBooked: true,
    },
  });

  await prisma.booking.create({
    data: {
      studentId: student.id,
      mentorId: mentor.id,
      availabilityId: slot.id,
      status: BookingStatus.ACCEPTED,
      note: "Looking for guidance on internship strategy.",
    },
  });

  console.log("Seed completed: users, profiles, internships, availability, booking.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
