import CityCard from "@/components/cards/city";
import AnimatedCitiesGrid, {
  AnimatedCityCard,
} from "../../../../components/shared/animated";

export default function CitiesCards({
  cities,
}: {
  cities: City[] | undefined;
}) {
  return (
    <section>
      <AnimatedCitiesGrid>
        {cities?.map((city) => (
          <AnimatedCityCard key={city.id}>
            <CityCard city={city} />
          </AnimatedCityCard>
        ))}
      </AnimatedCitiesGrid>
    </section>
  );
}
