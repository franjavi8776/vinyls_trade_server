import { Request, Response } from "express";
import { Op } from "sequelize";
import { Vinyl } from "../../Models/Vinyls";

//! CRUD vinyls
export const getVinyls = async (req: Request, res: Response) => {
  try {
    const response = await Vinyl.findAll();
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
export const getVinyl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let vinyl = await Vinyl.findByPk(id);
    res.status(200).json(vinyl);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createVinyl = async (req: Request, res: Response) => {
  try {
    const vinyl = await Vinyl.create(req.body);
    res.status(200).json(vinyl);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateVinyl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vinyl = await Vinyl.findByPk(id);
    if (!vinyl) {
      res.status(404).json({ error: "Vinyl not found" });
    } else {
      await vinyl.update(req.body);
      res.sendStatus(204);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteVinyl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Vinyl.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//! filter vinyls
export const getVinylsForTitle = async (req: Request, res: Response) => {
  try {
    const { title } = req.query;

    const response = await Vinyl.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getVinylsForGenre = async (req: Request, res: Response) => {
  try {
    const { genre } = req.query;

    const response = await Vinyl.findAll({
      where: {
        genre: {
          [Op.like]: `%${genre}%`,
        },
      },
    });

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getVinylsForTitleAD = async (req: Request, res: Response) => {
  try {
    const { order } = req.query;

    const orderBy: [string, "ASC" | "DESC"][] = [
      ["title", order === "D" ? "DESC" : "ASC"],
    ];

    const response = await Vinyl.findAll({
      order: orderBy,
    });

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getVinylsByDecade = async (req: Request, res: Response) => {
  try {
    const { startYear, endYear } = req.query;

    if (
      !startYear ||
      !endYear ||
      isNaN(Number(startYear)) ||
      isNaN(Number(endYear))
    ) {
      return res.status(400).json({ error: "Invalid startYear or endYear" });
    }

    const response = await Vinyl.findAll({
      where: {
        year: {
          [Op.gte]: Number(startYear),
          [Op.lte]: Number(endYear),
        },
      },
    });

    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
