import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Check } from "lucide-react";
import fetcher from "@utils/fetcher";
import ManagerRegistrationDialog from "../components/manager-registration-dialog";

interface Package {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: number;
  status: string;
}

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: packages, isLoading } = useQuery({
    queryKey: ["public-packages"],
    queryFn: async () => {
      const response = await fetcher("packages");
      return response.data as Package[];
    },
  });

  const activePackages = packages?.filter((pkg) => pkg.status === "active");

  const handleGetStarted = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsDialogOpen(true);
  };

  return (
    <>
      <ManagerRegistrationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        packageId={selectedPackage?.id || 0}
        packageName={selectedPackage?.name || ""}
      />
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect plan for your farm. All packages include core
              features with flexible options to match your needs.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <CircularProgress sx={{ color: "#16a34a" }} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activePackages?.map((pkg, index) => (
                <Card
                  key={pkg.id}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                    ...(index === 1 && {
                      borderTop: "4px solid",
                      borderColor: "#16a34a",
                    }),
                  }}
                >
                  {index === 1 && (
                    <Chip
                      label="POPULAR"
                      color="success"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: "bold",
                      }}
                    />
                  )}

                  <CardContent sx={{ flexGrow: 1, p: 4 }}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>

                    <div className="mb-4">
                      <span className="text-4xl font-bold text-green-600">
                        ₹{parseFloat(pkg.price).toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-2">
                        / {pkg.duration} days
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6">{pkg.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">
                          Full access to farm management tools
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">
                          Inventory & batch tracking
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">
                          Season management
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">
                          Employee management
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">
                          Reports & analytics
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardActions sx={{ p: 4, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={() => handleGetStarted(pkg)}
                      sx={{
                        bgcolor: "#16a34a",
                        color: "white",
                        borderRadius: "12px",
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#15803d", boxShadow: "none" },
                      }}
                    >
                      Get Started
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && (!activePackages || activePackages.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No packages available at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PackagesSection;
