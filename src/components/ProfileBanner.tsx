"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMember } from "@/lib/definitions";
import Image from "next/image";
import { Stack, Chip } from "@mui/material";
import Male from "@mui/icons-material/Male";

interface Props {
  teamMember: TeamMember;
}

export default function ProfileBanner({ teamMember }: Props) {
  return (
    <Card className="rounded-lg mb-5">
      <div className="flex items-center gap-2 mb-2 mt-2">
        <div className="flex justify-center items-center">
          <Image src={teamMember.profileImage} alt="Profile image" width={90} height={90} className="p-1 ml-5 mr-5" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            {teamMember.firstName + " " + teamMember.lastName}
            <Male sx={{ color: "blue" }} />
            {/* <h2 className="text-xl">
              {teamMember.age}, {teamMember.nric}, {teamMember.idNo}, {teamMember.dob}
            </h2> */}
          </h1>
          <Stack direction="row" spacing={1} className="mt-3">
            <Chip label="CHAS-blue" color="primary" sx={{ height: 24, fontSize: 12 }} />
            <Chip label="Medisave" color="success" sx={{ height: 24, fontSize: 12 }} />
            <Chip label="HSG-Enrolled" color="primary" variant="outlined" sx={{ height: 24, fontSize: 12 }} />
          </Stack>
        </div>
      </div>
    </Card>
  );
}
