<?php

namespace Mapper;

use Model\DbConnection;

class Fetch
{

    private $dbConnect;

    public function __construct()
    {
        $this->dbConnect = DbConnection::getInstance();
    }

    public function read($kategorie, $entfernung, $preis, $veggie)
    {
        $maxEntf = max($entfernung);
        $maxPreis = max($preis);
        $minVeggie = min($veggie);
        $kategID = implode(",", $kategorie);
        $returnArr = [];

        $sql = "SELECT * FROM restaurants WHERE entfernung<=? AND preis <=? AND veggie<=? AND kategorie IN (?)";

        if ($preStmt = $this->dbConnect->prepare($sql)) {
            $preStmt->bind_param("iiis", $maxEntf, $maxPreis, $minVeggie, $kategID);
            $preStmt->execute();

            $preStmt->bind_result($id, $name, $entf, $prei, $veg, $addy, $kat);

            while ($preStmt->fetch()) {
                $returnArr[] = ["name" => $name, "entfernung" => $entf, "preis" => $prei, "veggie" => $veg];
            }

        } else {
            echo "FEHLER, FEEEEEEEHLER!";
        }

        $preStmt->free_result();
        $preStmt->close();

        return $returnArr;
    }
}