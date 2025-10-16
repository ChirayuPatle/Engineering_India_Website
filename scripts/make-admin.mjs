/**
 * Script to make a user an admin
 * Usage: node scripts/make-admin.js <email>
 * Example: node scripts/make-admin.js admin@example.com
 */

import { db } from "../src/database/db.js";
import { user } from "../src/database/schema/index.js";
import { eq } from "drizzle-orm";

const email = process.argv[2];

if (!email) {
  console.error("❌ Error: Please provide an email address");
  console.log("Usage: node scripts/make-admin.js <email>");
  console.log("Example: node scripts/make-admin.js admin@example.com");
  process.exit(1);
}

async function makeAdmin() {
  try {
    console.log(`🔍 Looking for user with email: ${email}`);

    // Check if user exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (existingUser.length === 0) {
      console.error(`❌ Error: No user found with email: ${email}`);
      process.exit(1);
    }

    const foundUser = existingUser[0];
    console.log(`✅ Found user: ${foundUser.name} (${foundUser.email})`);

    // Check if already admin
    if (foundUser.role === "ADMIN") {
      console.log(`ℹ️  User is already an admin!`);
      process.exit(0);
    }

    // Update role to ADMIN
    console.log(`🔄 Updating role from ${foundUser.role} to ADMIN...`);

    await db
      .update(user)
      .set({ role: "ADMIN", updatedAt: new Date() })
      .where(eq(user.email, email));

    console.log(`✅ Success! ${foundUser.name} is now an ADMIN`);
    console.log(`\n📝 User Details:`);
    console.log(`   Name: ${foundUser.name}`);
    console.log(`   Email: ${foundUser.email}`);
    console.log(`   Role: ADMIN`);
    console.log(
      `\n🚀 User can now access: http://localhost:3000/admin/dashboard`,
    );
  } catch (error) {
    console.error("❌ Error making user admin:", error);
    process.exit(1);
  }
}

makeAdmin();
